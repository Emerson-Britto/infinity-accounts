<template>
  <div>
    <section id="viewPort">
      <Form id="form" :validation-schema="schema" @submit="submit()">
        <div class="form-group flexColumnStartMode">
          <label for="userName" class="input-labels">Username</label>
          <Field
            id="userName"
            v-model="formData.username"
            class="input-data"
            type="text"
            name="username"
            maxlength="18"
            placeholder="Ex: nexashi, nexa_shii ..."
            @input="() => verifyInputs()"
          />
        </div>
        <ErrorMessage class="msg-error" name="username" />
        <p v-if="events.usernameExists" class="msg-error">
          username already exist.
        </p>

        <div class="form-group flexColumnStartMode">
          <label for="inMail" class="input-labels">E-mail</label>
          <Field
            id="inMail"
            v-model="formData.mail"
            class="input-data"
            type="email"
            name="email"
            maxlength="34"
            placeholder="Ex: nexashione@gmail.com"
            @input="() => verifyInputs()"
          />
        </div>
        <ErrorMessage class="msg-error" name="email" />
        <p v-if="events.mailExists" class="msg-error">
          email already exist. try Sign In
        </p>
        <!--         <p v-if="events.checkingData" class="msg-alert">
          Checking if data already exist...
        </p> -->
        <span>
          <p class="msg-alert">* A authorization email will be sent</p>
        </span>

        <section v-show="!events.onRequest" class="actions-btns">
          <button class="btn-form-submit" @click="backStep()">Back</button>
          <button class="btn-form-submit">Sign Up</button>
        </section>
        <LoadingForm v-if="events.onRequest"></LoadingForm>
      </Form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import storage from "@/common/storage";
import { Form, Field, ErrorMessage } from "vee-validate";
import LoadingForm from "@/components/loadingForm.vue";
import * as yup from "yup";

export default defineComponent({
  name: "FormSignUp",
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingForm,
  },
  // data: () => ({
  //   showAlertMail: true
  // }),
  computed: {
    formData() {
      return store.getters.formData;
    },
    events() {
      return store.getters.events;
    },
    schema() {
      return yup.object({
        username: yup
          .string()
          .matches(/^[a-zA-Z0-9-_]+$/, "invalid username")
          .required()
          .min(4)
          .max(14),
        email: yup.string().required().email().max(40),
      });
    },
  },
  methods: {
    verifyInputs(): void {
      const username = this.formData.username;
      const mail = this.formData.mail;
      if (username.length < 4 || mail.length < 4) return;
      const form = { username, mail };
      store.dispatch("verifyField", form);
      return;
    },
    backStep(): void {
      store.dispatch("signUpNextStep", { backStep: true });
    },
    submit(): void {
      const events = this.events;
      if (events.mailExists || events.usernameExists || events.checkingData)
        return;
      store.dispatch("formSignUpSubmit").then((res: any) => {
        console.log({ res });
        if (res.request.status == 200) {
          storage.set("__SOCKET_CODE", res.data.socketCode);
          this.$router.push({ name: "verification" });
        }
      });
    },
  },
});
</script>
<style scoped lang="scss">
#viewPort {
  text-align: center;
}

#form {
  margin-top: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.flexColumnStartMode {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.form-group {
  width: 80%;
  margin: 10px 0;
}

.input-labels {
  margin: 0 0 8px 5px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.input-data {
  border: none;
  outline: none;
  background-color: transparent;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border-bottom: 2px solid #404250;
  color: #fff;
  padding: 0 10px;
  border-radius: 10px;
  width: 100%;
  height: 25px;
}

.input-data:focus {
  border-bottom: 2px solid #858586;
}

.msg-error {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 0.9em;
  margin: 0 10px;
  color: #c22526;
}

.msg-alert {
  opacity: 0.7;
  margin: 5px 0;
}

.btn-form-submit {
  margin: 15px 10px;
  border: none;
  cursor: pointer;
  color: #e0dfde;
  font-size: 1.1em;
  background-color: transparent;
  padding: 5px 10px;
  border: 2px solid #fff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  transition: 400ms;
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
