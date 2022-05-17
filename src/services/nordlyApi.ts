import axios from "axios";
import dataTracker from "./dataTracker";
import { debounceTime } from "../helpers";
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

//API WRAPPER.
class NordlyApi {
  devENV: boolean;
  istaticDEV: string;
  istaticPROD: string;
  baseUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === "development";
    this.istaticDEV = `http://localhost:1234`;
    this.istaticPROD = "https://infinity-api-nex.herokuapp.com";
    this.baseUrl = this.devENV ? this.istaticDEV : this.istaticPROD;
  }

  async login(user: AccountAccessInfor): Promise<any> {
    const deviceData = await dataTracker.getDeviceData();
    return axios.post(`${this.baseUrl}/login`, Object.assign(user, deviceData));
  }

  async createAccount(newUser: AccountAccessInfor): Promise<any> {
    const deviceData = await dataTracker.getDeviceData();
    return axios.post(
      `${this.baseUrl}/create`,
      Object.assign(newUser, deviceData)
    );
  }

  async verifyMailExists(mail: string): Promise<boolean> {
    return debounceTime(
      () => axios.get(`${this.baseUrl}/exists?mail=${mail}`),
      800
    ).then((res: { data: { mail: boolean } }) => res.data.mail);
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
