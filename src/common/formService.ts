import axios from "axios";
import { dataManager } from "./dataManagerService";
import { SignInForm, SignUpForm } from "./interface/form.interface";
import { asyncTimeOut } from "./utils/operators";

//const API = "https://infinity-api-nex.herokuapp.com/msk/account";
const LOCAL_API = "http://localhost:1234/msk/account";

class FormService {
  async login(newUser: SignInForm): Promise<any> {
    const { mail, password } = newUser;
    const deviceData = await dataManager.getDeviceData();

    return axios.post<SignInForm>(`${LOCAL_API}/login`, {
      mail,
      password,
      deviceData,
    });
  }

  async createAccount(newUser: SignUpForm): Promise<any> {
    const deviceData = await dataManager.getDeviceData();

    return axios.post(`${LOCAL_API}/create`, { newUser, deviceData });
  }

  async verifyMailExists(mail: string): Promise<any> {
    return asyncTimeOut(() => {
      return axios.get(`${LOCAL_API}/exists?mail=${mail}`);
    }, 800).then((res: any) => res.data.mail);
  }

  async checkCode(mail: string, code: string): Promise<any> {
    return axios.get(`${LOCAL_API}/verifyMail?mail=${mail}&code=${code}`);
  }

  async createFastToken(acesssToken: string, after_url: string): Promise<any> {
    return axios.get(
      `${LOCAL_API}/createFastToken?accessToken=${acesssToken}&afterUrl=${after_url}`
    );
  }
}

export const formService = new FormService();
