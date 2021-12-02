import axios from "axios";
import { dataManager } from "./dataManagerService";
import { SignUpForm, dataExists } from "./interface/form.interface";

//const API = "https://infinity-api-nex.herokuapp.com/msk/account";
const LOCAL_API = "http://localhost:1234/msk/account";

class SignUpService {
  async createAccount(newUser: SignUpForm): Promise<any> {
    const deviceData = await dataManager.getDeviceData();

    return axios
      .post<SignUpForm>(`${LOCAL_API}/create`, { newUser, deviceData })
      .then((res) => res.data);
  }

  async verifyMailExists(mail: string): Promise<any> {
    return axios
      .get<dataExists>(`${LOCAL_API}/exists?mail=${mail}`)
      .then((res) => res.data.mail);
  }
}

export const signUpService = new SignUpService();
