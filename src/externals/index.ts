const devENV = true;

const prodAPI = "https://cdn-istatics.herokuapp.com/static/";
const devAPI = "http://localhost:9872/static/";

const BaseUrl = devENV ? devAPI : prodAPI;

interface getIconUrl {
  [key: string]: () => string;
}

export const getIcon: getIconUrl = {
  twitter: () => `${BaseUrl}imgs/branding/twitter.svg`,
  google: () => `${BaseUrl}imgs/branding/google.svg`,
  github: () => `${BaseUrl}imgs/branding/github.svg`,
  apple: () => `${BaseUrl}imgs/branding/apple.svg`,
  icon_expand_more: () => `${BaseUrl}icons/expand_more_white_24dp.svg`,
  sendMail: () => `${BaseUrl}imgs/repository/sendMail.png`,
  mailIcon: () => `${BaseUrl}icons/email_white_24dp.svg`,
  historyIcon: () => `${BaseUrl}icons/history_white_24dp.svg`,
};
