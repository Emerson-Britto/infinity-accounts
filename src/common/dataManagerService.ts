import axios from "axios";

//const CLOUDFLARE = "https://www.cloudflare.com/cdn-cgi/trace";
//const IPIFY = "https://api.ipify.org/?format=json";
const FUCK_IP_GUYS = "https://wtfismyip.com/json";

export interface deviceData {
  userAgent: string;
  platform: string;
  app: {
    appName: string;
    appCodeName: string;
    appVersion: string;
    language: string;
    doNotTrack: string;
    cookieEnabled: string;
  };
  localInfor: any;
}

interface DataManagerType {
  getlocalInfor(): any;
  getDeviceData(): Promise<deviceData>;
}

class DataManager implements DataManagerType {
  getlocalInfor(): any {
    return axios.get<any>(FUCK_IP_GUYS).then((res) => res.data);
  }
  getDeviceData(): Promise<deviceData> {
    return this.getlocalInfor().then((locationData: any) => {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const appCodeName = navigator.appCodeName;
      const appName = navigator.appName;
      const appVersion = navigator.appVersion;
      const language = navigator.language;
      const doNotTrack = navigator.doNotTrack;
      const cookieEnabled = navigator.cookieEnabled;

      return {
        userAgent,
        platform,
        app: {
          appName,
          appCodeName,
          appVersion,
          language,
          doNotTrack,
          cookieEnabled,
        },
        locationData,
      };
    });
  }
}
export const dataManager = new DataManager();
