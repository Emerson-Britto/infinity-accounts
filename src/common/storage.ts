const tokenSlotName = "USER_SD_ACCESS";

export class Storage {
  constructor() {
    throw Error("No");
  }

  static set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key: string): any {
    const data: any = localStorage.getItem(key);
    return JSON.parse(data);
  }

  static del(key: string): void {
    localStorage.removeItem(key);
  }

  static reset(): void {
    localStorage.clear();
  }

  static getLength(): number {
    return localStorage.length;
  }

  static setToken(token: string): void {
    localStorage.setItem(tokenSlotName, JSON.stringify(token));
  }

  static hasToken(): boolean {
    return Boolean(localStorage.getItem(tokenSlotName));
  }

  static getToken(): string {
    const data: any = localStorage.getItem(tokenSlotName);
    return JSON.parse(data);
  }
}
