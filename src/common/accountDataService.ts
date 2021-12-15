import axios from "axios";

//const API = "https://infinity-api-nex.herokuapp.com/msk/account";
const LOCAL_API = "http://localhost:1234/msk/account";

class AccountDataService {
  async getAccountData(acesssToken: string, part: string): Promise<any> {
    return axios.get(`${LOCAL_API}?accessToken=${acesssToken}&part=${part}`);
  }
}

export const accountDataService = new AccountDataService();
