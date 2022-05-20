import axios from "axios";

const FUCK_IP = "https://wtfismyip.com/json";
//const CLOUDFLARE = "https://www.cloudflare.com/cdn-cgi/trace";
//const IPIFY = "https://api.ipify.org/?format=json";

export interface deviceData {
  userAgent: string;
  platform: string;
  app: {
    appName: string;
    appCodeName: string;
    appVersion: string;
    language: string;
    doNotTrack: string;
    cookieEnabled: boolean;
  };
  locationData: any;
}

interface DataTrackerInterface {
  getDeviceData(): Promise<deviceData>;
}

class DataTracker implements DataTrackerInterface {
  async getDeviceData(): Promise<deviceData> {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const appCodeName = navigator.appCodeName;
    const appName = navigator.appName;
    const appVersion = navigator.appVersion;
    const language = navigator.language;
    const doNotTrack = navigator.doNotTrack || "0";
    const cookieEnabled = navigator.cookieEnabled;
    const locationData = FUCK_IP
      ? await axios.get(FUCK_IP).then((res) => res.data)
      : null;

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
  }
}

const dataTracker = new DataTracker();
export default dataTracker;
