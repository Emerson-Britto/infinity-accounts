import axios from "axios";

const CLOUDFLARE = "https://www.cloudflare.com/cdn-cgi/trace";

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
  getDeviceData(): deviceData;
}

class DataManager implements DataManagerType {
  getlocalInfor(): any {
    return axios.get<any>(CLOUDFLARE).then((res) => {
      const data = res.data;

      const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      const locRegex = /loc=[A-Z]*/;
      const ip = data.match(ipRegex)[0];
      const loc = data.match(locRegex)[0];

      return { ip: new String(ip) + "", loc: new String(loc) + "" };
    });
  }
  getDeviceData(): deviceData {
    return this.getlocalInfor().then((localDeviceInfor: any) => {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const appCodeName = navigator.appCodeName;
      const appName = navigator.appName;
      const appVersion = navigator.appVersion;
      const language = navigator.language;
      const doNotTrack = navigator.doNotTrack;
      const cookieEnabled = navigator.cookieEnabled;
      const localInfor = localDeviceInfor;

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
        localInfor,
      };
    });
  }
}
export const dataManager = new DataManager();
