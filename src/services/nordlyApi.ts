import axios from "axios";
import dataTracker from "./dataTracker";
import storage from "../common/storage";
import { debounceTime, createUrlParams } from "../helpers";
import { AccountAccessInfor, AccountInfor } from "../common/interface";

export interface CreateFastTKResponse {
  data: {
    KEY: string;
  };
}

export interface AccountDataResponse {
  data: {
    account: AccountInfor;
    currentDevice?: any;
  };
}

export interface VerifyExistsParams {
  username?: string;
  mail?: string;
}

export interface VerifyExistsResponse {
  hasEvenUsername: boolean | null;
  hasEvenMail: boolean | null;
}

//API WRAPPER.
class NordlyApi {
  devENV: boolean;
  nordlyDEV: string;
  nordlyPROD: string;
  baseUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === "development";
    this.nordlyDEV = `http://localhost:7050`;
    this.nordlyPROD = "https://infinity-api-nex.herokuapp.com";
    this.baseUrl = this.devENV ? this.nordlyDEV : this.nordlyPROD;
  }

  async login(user: AccountAccessInfor): Promise<any> {
    const deviceData = await dataTracker.getDeviceData();
    return axios.post(`${this.baseUrl}/account/login`, { user, deviceData });
  }

  async createAccount(newUser: AccountAccessInfor): Promise<any> {
    const deviceData = await dataTracker.getDeviceData();
    return axios.post(`${this.baseUrl}/account/create`, {
      newUser,
      deviceData,
    });
  }

  async verifyExists(
    inputs: VerifyExistsParams
  ): Promise<VerifyExistsResponse> {
    const params: string = createUrlParams(inputs);
    return axios
      .get(`${this.baseUrl}/account/exists?${params}`)
      .then((res: { data: VerifyExistsResponse }) => res.data);
  }

  async createFastToken(after_url: string): Promise<CreateFastTKResponse> {
    const accessToken = storage.getToken();
    const params = `afterUrl=${after_url}`;
    return axios.get(`${this.baseUrl}/createFastToken?${params}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async logout() {
    const accessToken = storage.getToken();
    return axios
      .get(`${this.baseUrl}/account/logout`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((r: any) => {
        this.delToken();
        return r;
      });
  }

  async accountData(part: string): Promise<AccountDataResponse> {
    const accessToken = storage.getToken();
    return axios
      .get(`${this.baseUrl}/account?part=${part}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err: any) => this.onCatch(err));
  }

  async onCatch(err: any) {
    const error = err.response?.data?.error || "";
    const invalidTokenError = error.name === "InvalidTokenError";
    if (invalidTokenError) this.delToken();
    return err;
  }

  setToken(accessToken: string): void {
    storage.setToken(accessToken);
  }

  delToken() {
    storage.delToken();
  }
}
const nordlyApi = new NordlyApi();
export default nordlyApi;
