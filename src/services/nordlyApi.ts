import axios from "axios";
import dataTracker from "./dataTracker";
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

  async createFastToken(
    acesssToken: string,
    after_url: string
  ): Promise<CreateFastTKResponse> {
    const params = `accessToken=${acesssToken}&afterUrl=${after_url}`;
    return axios.get(`${this.baseUrl}/createFastToken?${params}`);
  }

  async accountData(
    acesssToken: string,
    part: string
  ): Promise<AccountDataResponse> {
    return axios.get(`${this.baseUrl}?accessToken=${acesssToken}&part=${part}`);
  }
}
const nordlyApi = new NordlyApi();
export default nordlyApi;
