import axios from "axios";
import { dataManager } from "./dataManagerService";
import { SignInForm } from "./interface/form.interface";

//const API = "https://infinity-api-nex.herokuapp.com/msk/account";
const LOCAL_API = "http://localhost:1234/msk/account";

class SignInService {
  async login(newUser: SignInForm): Promise<any> {
    const { mail, password } = newUser;
    const deviceData = await dataManager.getDeviceData();

    return axios
      .post<SignInForm>(`${LOCAL_API}/login`, { mail, password, deviceData })
      .then((res) => res.data);
  }
}

export const signInService = new SignInService();
