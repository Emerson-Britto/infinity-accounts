<template>
  <Form id="form" :validation-schema="schema" @submit="submit()">
    <div class="form-group">
      <label for="inPassword" class="input-labels">Password</label>
      <Field
        id="inPassword"
        v-model="formData.password"
        class="input-data"
        type="password"
        name="password"
        maxlength="30"
        placeholder="Your password"
      />
    </div>
    <ErrorMessage class="msg-error" name="password" />

    <div class="form-group">
      <label for="inRePassword" class="input-labels">re-Password</label>
      <Field
        id="inRePassword"
        v-model="formData.rePassword"
        class="input-data"
        type="password"
        name="rePassword"
        maxlength="30"
        placeholder="Your password"
      />
    </div>
    <ErrorMessage class="msg-error" name="rePassword" />

    <section v-show="!onRequest" class="actions-btns">
      <button class="btn-form-submit" @click="backStep()">Back</button>
      <button class="btn-form-submit">Sign Up</button>
    </section>
    <LoadingForm v-if="onRequest"></LoadingForm>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingForm from "@/components/loadingForm.vue";
import store from "@/store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "PasswordForm",
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingForm,
  },
  data: () => ({
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
        password: yup
          .string()
          .required()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/,
            this.passwordError
          )
          .matches(store.getters.formData.rePassword, this.noMatches)
          .min(8),
        rePassword: yup
          .string()
          .required()
          .matches(store.getters.formData.password, this.noMatches)
          .min(8),
      });
    },
  },
  methods: {
    passwordMatches(value: string): boolean | string {
      if (value !== this.formData.password) {
        return true;
      }
      return "Password No Matches";
    },
    backStep(): void {
      store.dispatch("signUpNextStep", { backStep: true });
    },
    submit(): void {
      store.dispatch("formSignUpSubmit").then((res) => {
        if (res.request.status == 201) {
          this.$router.push({ name: "verification" });
        }
      });
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
