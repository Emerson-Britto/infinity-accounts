import { createStore } from "vuex";
import { BtnStates } from "@/common/enums";
import { formService } from "@/common/formService";

export default createStore({
  state: {
    formType: BtnStates.SIGNIN,
    formSignUpStep: 0,
    formSignUpMaxStep: 2, // start with 0
    asyncEvent: {
      mailAlreadyExists: false,
      checkingMail: false,
      requestError: false,
      onRequest: false,
    },
    formData: {
      name: "",
      lastName: "",
      gender: "Male",
      birthDate: "",
      displayName: "",
      mail: "",
      password: "",
      rePassword: "",
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
    NEXT_STEP_FORM_SIGN_UP(state, { backStep = false }) {
      if (backStep && state.formSignUpStep) {
        state.formSignUpStep--;
        return;
      } else if (!backStep && state.formSignUpStep < state.formSignUpMaxStep) {
        state.formSignUpStep++;
      }
    },
    VERIFY_MAIL_FIELD(state, mailExist) {
      state.asyncEvent.mailAlreadyExists = mailExist === true;
      state.asyncEvent.checkingMail = false;
    },
    ON_REQUEST(state, status) {
      state.asyncEvent.onRequest = status;
    },
    REQUEST_ERROR(state) {
      state.asyncEvent.requestError = true;
      state.asyncEvent.onRequest = false;
      setTimeout(() => (state.asyncEvent.requestError = false), 5000);
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
      commit("ON_REQUEST", true);
      this.state.asyncEvent.checkingMail = true;
      formService.verifyMailExists(mailInput).then((mailExist) => {
        commit("ON_REQUEST", false);
        commit("VERIFY_MAIL_FIELD", mailExist);
      });
    },
    formSignInSubmit({ commit }) {
      commit("ON_REQUEST", true);
      const { mail, password } = this.state.formData;
      return formService
        .login({ mail, password })
        .then((res) => {
          commit("ON_REQUEST", false);
          return res;
        })
        .catch((err) => {
          commit("REQUEST_ERROR");
          return err;
        });
    },
    formSignUpSubmit({ commit }) {
      if (
        this.state.asyncEvent.mailAlreadyExists &&
        this.state.asyncEvent.checkingMail
      ) {
        return;
      }
      commit("ON_REQUEST", true);
      return formService
        .createAccount({ ...this.state.formData })
        .then((res) => {
          commit("ON_REQUEST", false);
          return res;
        })
        .catch((err) => {
          commit("REQUEST_ERROR");
          return err;
        });
    },
    verifyCode() {
      const { mail, verificationCodeField } = this.state.formData;
      return formService.checkCode(mail, verificationCodeField);
    },
  },
  getters: {
    formType: (state) => state.formType,
    formSignUpMaxStep: (state) => state.formSignUpMaxStep,
    formSignUpStep: (state) => state.formSignUpStep,
    formData: (state) => state.formData,
    mailExist: (state) => state.asyncEvent.mailAlreadyExists,
    checkingMail: (state) => state.asyncEvent.checkingMail,
    onRequest: (state) => state.asyncEvent.onRequest,
    requestError: (state) => state.asyncEvent.requestError,
  },
  modules: {},
});
