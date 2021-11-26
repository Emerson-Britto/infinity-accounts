<template>
  <div>
    <section>
      <UserDataForm v-if="formSignUpStep === 0"></UserDataForm>
      <AccountDataForm v-if="formSignUpStep === 1"></AccountDataForm>
    </section>
    <section class="actions-btns">
      <button class="btn-form-submit" @click="backStep()">Back</button>
      <button class="btn-form-submit" @click="nextStep()">
        {{ formSignUpStep === 1 ? "Sign Up" : "Next" }}
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import UserDataForm from "@/components/userDataForm.vue";
import AccountDataForm from "@/components/accountDataForm.vue";

export default defineComponent({
  name: "FormSignUp",
  components: {
    UserDataForm,
    AccountDataForm,
  },
  computed: {
    formSignUpStep(): void {
      return store.getters.formSignUpStep;
    },
  },
  methods: {
    nextStep(): void {
      store.dispatch("signUpNextStep");
    },
    backStep(): void {
      store.dispatch("signUpNextStep", { backStep: true });
    },
  },
});
</script>
<style scoped lang="scss">
.actions-btns {
  margin: 0 auto;
  text-align: center;
  width: 60%;
}
.btn-form-submit {
  margin: 20px 10px;
  border: none;
  cursor: pointer;
  color: #e0dfde;
  font-size: 1.1em;
  background-color: transparent;
  padding: 5px 10px;
  border: 2px solid #e0dfde;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  transition: 500ms;
}

.btn-form-submit:hover {
  background-color: #e0dfde;
  color: #000;
}

.btn-form-submit:disabled {
  opacity: 50%;
  cursor: not-allowed;
}
</style>
