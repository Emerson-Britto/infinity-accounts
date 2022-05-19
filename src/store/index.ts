import { createStore } from "vuex";
import { BtnStates } from "../common/enums";
import { nordlyApi } from "../services";

export default createStore({
  state: {
    formType: BtnStates.SIGNIN,
    events: {
      mailAlreadyExists: false,
      checkingMail: false,
      requestError: false,
      onRequest: false,
    },
    formData: {
      username: "",
      mail: "",
      verificationCodeField: "",
    },
  },
  mutations: {
    UPDATE_FORM_TYPE(state) {
      if (state.formType == BtnStates.SIGNIN) {
        state.formType = BtnStates.SIGNUP;
        return;
      }
      state.formType = BtnStates.SIGNIN;
    },
    VERIFY_MAIL_FIELD(state, mailExist) {
      state.events.mailAlreadyExists = mailExist === true;
      state.events.checkingMail = false;
    },
    REQUESTING(state, status) {
      state.events.onRequest = status;
    },
    REQUEST_ERROR(state) {
      state.events.requestError = true;
      state.events.onRequest = false;
      setTimeout(() => (state.events.requestError = false), 5000);
    },
  },
  actions: {
    switchForm({ commit }) {
      commit("UPDATE_FORM_TYPE");
    },
    signUpNextStep({ commit }, option = {}) {
      commit("NEXT_STEP_FORM_SIGN_UP", option);
    },
    verifyMailField({ commit }, mailInput) {
      commit("REQUESTING", true);
      this.state.events.checkingMail = true;
      nordlyApi.verifyMailExists(mailInput).then((mailExist) => {
        commit("REQUESTING", false);
        commit("VERIFY_MAIL_FIELD", mailExist);
      });
    },
    formSignInSubmit({ commit }) {
      commit("REQUESTING", true);
      const { username, mail } = this.state.formData;
      return nordlyApi
        .login({ username, mail })
        .then((res: any) => {
          commit("REQUESTING", false);
          return res;
        })
        .catch((err: any) => {
          commit("REQUEST_ERROR");
          return err;
        });
    },
    formSignUpSubmit({ commit }) {
      if (
        this.state.events.mailAlreadyExists &&
        this.state.events.checkingMail
      ) {
        return;
      }
      commit("REQUESTING", true);
      return nordlyApi
        .createAccount({ ...this.state.formData })
        .then((res: any) => {
          commit("REQUESTING", false);
          return res;
        })
        .catch((err: any) => {
          commit("REQUEST_ERROR");
          return err;
        });
    },
    verifyCode() {
      // const { mail, verificationCodeField } = this.state.formData;
      // return nordlyApi.checkCode(mail, verificationCodeField);
      return;
    },
  },
  getters: {
    formType: (state) => state.formType,
    formData: (state) => state.formData,
    events: (state) => state.events,
  },
  modules: {},
});
