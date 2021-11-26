import { createStore } from "vuex";
import { BtnStates } from "@/common/enums";

const FORM_SIGN_UP_PAGE_TOTAL = 2;

export default createStore({
  state: {
    formType: BtnStates.SIGNIN,
    formSignUpStep: 0,
    formDataSignUp: {
      name: null,
      lastName: null,
      gender: "Male",
      birthDate: null,
      displayName: null,
      mail: null,
      password: null,
      rePassword: null,
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
      } else if (
        !backStep &&
        state.formSignUpStep < FORM_SIGN_UP_PAGE_TOTAL - 1
      ) {
        state.formSignUpStep++;
      }
    },
  },
  actions: {
    switchForm({ commit }) {
      commit("UPDATE_FORM_TYPE");
    },
    signUpNextStep({ commit }, option = {}) {
      commit("NEXT_STEP_FORM_SIGN_UP", option);
    },
  },
  getters: {
    formType: (state) => state.formType,
    formSignUpStep: (state) => state.formSignUpStep,
    formDataSignUp: (state) => state.formDataSignUp,
  },
  modules: {},
});
