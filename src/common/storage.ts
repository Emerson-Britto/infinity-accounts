/* eslint-disable */
class Storage {
  tokenSlotName: string;

  constructor() {
    this.tokenSlotName = "__USER_TK";
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  del(key: string): void {
    localStorage.removeItem(key);
  }

  reset(): void {
    localStorage.clear();
  }

  getLength(): number {
    return localStorage.length;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenSlotName, JSON.stringify(token));
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenSlotName);
  }

  getToken(): string {
    const data: string = localStorage.getItem(this.tokenSlotName) || "";
    return JSON.parse(data);
  }

  delToken(): void {
    localStorage.removeItem(this.tokenSlotName);
  }
}

const storage = new Storage();
export default storage;
