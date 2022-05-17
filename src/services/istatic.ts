import axios from "axios";

// API WRAPPER
class Istatic {
  devENV: boolean;
  istaticDEV: string;
  istaticPROD: string;
  baseUrl: string;
  staticSourcesUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === "development";
    this.istaticDEV = `http://localhost:${9872}`;
    this.istaticPROD = "https://cdn-istatics.herokuapp.com";
    this.baseUrl = this.devENV ? this.istaticDEV : this.istaticPROD;
    this.staticSourcesUrl = `${this.baseUrl}/static`;
  }

  profileImg(id: null | string = null): string {
    return `${this.baseUrl}/user-img/guest_temp`;
  }

  iconUrl({
    name,
    color = "white",
    format = "svg",
    dp = 24,
  }: {
    name: string;
    color?: string;
    format?: string;
    dp?: number;
  }): string {
    return `${this.staticSourcesUrl}/icons/${name}_${color}_${dp}dp.${format}`;
  }

  imgUrl({ path }: { path: string }): string {
    return `${this.staticSourcesUrl}/imgs/${path}`;
  }

  animatedSvgUrl({ name }: { name: string }): string {
    return `${this.staticSourcesUrl}/icons/AnimatedSvg/${name}.svg`;
  }

  staticPath(pathName: string): Promise<any> {
    return axios.get(`${this.staticSourcesUrl}/${pathName}`);
  }
}

const istatic = new Istatic();
export default istatic;
