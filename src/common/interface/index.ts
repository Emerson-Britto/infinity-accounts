export interface AccountInfor {
  displayName: string;
  mail: string;
  lastSeen: number;
}

export interface AccountAccessInfor {
  username: string;
  mail: string;
}

export interface WSCheckMailError {
  error: boolean;
  status: number;
  msg: string;
}
