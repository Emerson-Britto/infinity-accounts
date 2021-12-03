<template>
  <Form id="form" :validation-schema="schema">
    <div class="form-group">
      <label for="userName" class="input-labels">Username</label>
      <Field
        id="userName"
        v-model="formData.displayName"
        class="input-data"
        type="text"
        name="displayName"
        maxlength="18"
        placeholder="Ex: AlexaShi"
      />
    </div>
    <ErrorMessage class="msg-error" name="displayName" />

    <div class="form-group">
      <label for="inMail" class="input-labels">E-mail</label>
      <Field
        id="inMail"
        v-model="formData.mail"
        class="input-data"
        type="email"
        name="email"
        maxlength="34"
        placeholder="Ex: alexashione@gmail.com"
        @input="(e) => updateMailField(e.target.value)"
      />
    </div>
    <ErrorMessage class="msg-error" name="email" />
    <p v-if="mailExist" class="msg-error">email already exist. try Sign In</p>
    <p v-if="checkingMail" class="msg-alert">
      Checking if mail already exist...
    </p>
    <span>
      <h1 v-if="!checkingMail" class="msg-alert">
        * A verification email will be sent
      </h1>
    </span>

    <section class="actions-btns">
      <button class="btn-form-submit" @click="backStep()">Back</button>
      <button class="btn-form-submit" @click.prevent="nextStep()">Next</button>
    </section>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "AccountDataForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => ({
    showAlertMail: true,
    noMatches: "password no matches",
    passwordError:
      "Mininus one uppercase and lowercase letter, one number and special character",
  }),
  computed: {
    formData() {
      return store.getters.formData;
    },
    onRequest() {
      return store.getters.onRequest;
    },
    schema() {
      return yup.object({
        displayName: yup.string().required().min(4).max(14),
        email: yup.string().required().email(),
      });
    },
    mailExist() {
      return store.getters.mailExist;
    },
    checkingMail() {
      return store.getters.checkingMail;
    },
  },
  methods: {
    updateMailField(valueInput: string): void {
      store.dispatch("verifyMailField", valueInput);
      return;
    },
    backStep(): void {
      store.dispatch("signUpNextStep", { backStep: true });
    },
    nextStep(): void {
      if (this.checkingMail || this.mailExist) {
        return;
      }
      store.dispatch("signUpNextStep");
    },
  },
});
</script>
<style scoped lang="scss">
#form {
  margin-top: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 10px 0 10px 0;
}

.input-labels {
  margin: 15px 0 15px 5px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.input-data {
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid #404250;
  color: #fff;
  padding: 0 10px;
  border-radius: 10px;
  width: 330px;
  height: 25px;
}

.input-data-error {
  border-bottom: 2px solid red;
}

.input-data:focus {
  border-bottom: 2px solid #858586;
}

.input-disable {
  display: none;
}

.msg-alert {
  font-size: 0.8em;
  margin: 5px 0;
}

.msg-error {
  font-size: 0.9em;
  margin: 0 10px;
  color: #c22526;
}

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
