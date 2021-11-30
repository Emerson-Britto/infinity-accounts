import { createStore } from "vuex";
import { BtnStates } from "@/common/enums";
import { signUpService } from "@/common/signUpService";

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
    formDataSignUp: {
      name: "gffdssf",
      lastName: "fhgdff",
      gender: "Male",
      birthDate: "2003-04-03",
      displayName: "fgfgddgfhfghfg",
      mail: "fhffhgfhfgfgd@gmail.com",
      password: "#Y1q8uw2a",
      rePassword: "#Y1q8uw2a",
    },
    verificationCodeField: "",
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
      signUpService.verifyMailExists(mailInput).then((mailExist) => {
        commit("VERIFY_MAIL_FIELD", mailExist);
      });
    },
    formSignUpSubmit({ commit }) {
      if (
        this.state.asyncErrors.mailAlreadyExists &&
        this.state.asyncErrors.checkingMail
      ) {
        return;
      }
      return signUpService
        .createAccount({ ...this.state.formDataSignUp })
        .then((res) => {
          console.log(res);
        });
    },
  },
  getters: {
    formType: (state) => state.formType,
    formSignUpMaxStep: (state) => state.formSignUpMaxStep,
    formSignUpStep: (state) => state.formSignUpStep,
    formDataSignUp: (state) => state.formDataSignUp,
    mailExist: (state) => state.asyncErrors.mailAlreadyExists,
    checkingMail: (state) => state.asyncErrors.checkingMail,
    verificationCodeField: (state) => state.verificationCodeField,
  },
  modules: {},
});
