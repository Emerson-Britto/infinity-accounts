export interface SignUpForm {
  name: string;
  lastName: string;
  gender: string;
  birthDate: string;
  displayName: string;
  mail: string;
  password: string;
  rePassword: string;
}

export interface dataExists {
  userName: boolean;
  mail: boolean;
}