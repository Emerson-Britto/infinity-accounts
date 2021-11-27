import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.

  interface formDataSignUp {
    name: string,
    lastName: string,
    gender: string,
    birthDate: string,
    displayName: string,
    mail: string,
    password: string,
    rePassword: string,
  }

  interface State {
    formType: boolean,
    formSignUpStep: number,
    formDataSignUp: formDataSignUp
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}