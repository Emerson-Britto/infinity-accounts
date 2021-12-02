import { createStore } from "vuex";
import { BtnStates } from "@/common/enums";
import { formService } from "@/common/formService";

export default createStore({
  state: {
    formType: BtnStates.SIGNIN,
    formSignUpStep: 0,
    formSignUpMaxStep: 2, // start with 0
    asyncErrors: {
      mailAlreadyExists: false,
      checkingMail: false,
      requestError: false,
    },
    formData: {
      name: "gffdssf",
      lastName: "fhgdff",
      gender: "Male",
      birthDate: "2003-04-03",
      displayName: "fgfgddgfhfghfg",
      mail: "fhffhgfhfgfgd@gmail.com",
      password: "#Y1q8uw2a",
      rePassword: "#Y1q8uw2a",
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
      state.asyncErrors.mailAlreadyExists = mailExist === true;
      state.asyncErrors.checkingMail = false;
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
      this.state.asyncErrors.checkingMail = true;
      formService.verifyMailExists(mailInput).then((mailExist) => {
        commit("VERIFY_MAIL_FIELD", mailExist);
      });
    },
    formSignInSubmit() {
      const { mail, password } = this.state.formData;
      return formService.login({ mail, password });
    },
    formSignUpSubmit() {
      if (
        this.state.asyncErrors.mailAlreadyExists &&
        this.state.asyncErrors.checkingMail
      ) {
        return;
      }
      return formService
        .createAccount({ ...this.state.formData })
        .then((res) => {
          console.log(res);
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
    mailExist: (state) => state.asyncErrors.mailAlreadyExists,
    checkingMail: (state) => state.asyncErrors.checkingMail,
  },
  modules: {},
});
