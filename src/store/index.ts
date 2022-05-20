import { createStore } from "vuex";
import { BtnStates } from "../common/enums";
import { nordlyApi } from "../services";
import { debounceTime } from "../helpers";

export default createStore({
  state: {
    formType: BtnStates.SIGNIN,
    events: {
      usernameExists: false,
      mailExists: false,
      checkingData: false,
      requestError: false,
      onRequest: false,
    },
    formData: {
      username: "",
      mail: "",
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
    VERIFY_FIELD(state, data) {
      state.events.mailExists = Boolean(data.mail);
      state.events.usernameExists = Boolean(data.username);
      state.events.checkingData = false;
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
    verifyField({ commit }, inputs) {
      this.state.events.checkingData = true;
      return debounceTime(() => {
        commit("REQUESTING", true);
        return nordlyApi
          .verifyExists(inputs)
          .then((data) => {
            commit("REQUESTING", false);
            commit("VERIFY_FIELD", data);
          })
          .catch(() => commit("REQUEST_ERROR"));
      }, 1000);
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
  },
  getters: {
    formType: (state) => state.formType,
    formData: (state) => state.formData,
    events: (state) => state.events,
  },
  modules: {},
});
