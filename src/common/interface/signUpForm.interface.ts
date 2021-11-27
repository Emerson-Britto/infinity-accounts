export interface SignUpForm {
  nameField: string,
  lastNameField: string,
  userName: string;
  mail: string;
  password: string;
  rePassword: string;
}

export interface dataExists {
  userName: boolean;
  mail: boolean;
}