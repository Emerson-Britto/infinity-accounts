<template>
  <Form id="container" :validation-schema="schema" @submit="verifty()">
    <img class="sendMail_icon" :src="getIcon('sendMail')" />
    <h1>A verification email was send to {{ formData.mail }}</h1>

    <label for="codeField" class="input-labels">Code</label>
    <Field
      id="codeField"
      v-model="formData.verificationCodeField"
      class="input-data"
      type="text"
      name="codeField"
      maxlength="6"
      placeholder="000000"
    />
    <ErrorMessage class="msg-error" name="codeField" />

    <section>
      <button class="btn-form-submit" @click="backForm()">Back</button>
      <button class="btn-form-submit">Confirm</button>
    </section>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { getIcon } from "@/externals";

export default defineComponent({
  name: "VerificationForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    formData() {
      return store.getters.formData;
    },
    schema() {
      return yup.object({
        codeField: yup
          .string()
          .required()
          .min(6)
          .max(6)
          .matches(/[0-9]{6}/, "invalid code"),
      });
    },
  },
  methods: {
    getIcon(iconName: string): string {
      return getIcon[iconName]();
    },
    backForm() {
      this.$router.push({ name: "Forms" });
    },
    verifty() {
      store
        .dispatch("verifyCode")
        .then((res) => {
          if (res.request.status == 200) {
            store.dispatch("formSignInSubmit").then((res) => {
              console.log(res);
              alert("OK - verified");
            });
          }
        })
        .catch((err) => {
          if (err.request.status == 403) {
            alert("invalid code");
          }
          if (err.request.status == 410) {
            alert("code expired or never existed");
          }
        });
      return;
    },
  },
});
</script>
<style scoped lang="scss">
@font-face {
  font-family: Padauk-Regular;
  src: url("../assets/fonts/Padauk-Regular.ttf");
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Padauk-Regular;
  font-size: 1.5em;
  background-color: rgb(0 0 0 /60%);
  border: 2px solid;
  border-image: linear-gradient(135deg, #000, #fff, #000) 1;
  width: 440px;
  height: auto;
  margin: 50px auto;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

.sendMail_icon {
  width: 160px;
  margin: 20px 0;
}

.msg-error {
  font-size: 0.9em;
  margin: 0 10px;
  color: #c22526;
}

.input-labels {
  margin: 20px 0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.input-data {
  border: none;
  outline: none;
  text-align: center;
  background-color: transparent;
  border-bottom: 2px solid #404250;
  color: #fff;
  padding: 0 10px;
  margin: 10px 0;
  border-radius: 10px;
  width: 330px;
  height: 25px;
}

.input-data:focus {
  border-bottom: 2px solid #858586;
}

.btn-form-submit {
  margin: 20px 10px;
  border: none;
  cursor: pointer;
  color: #e0dfde;
  font-size: 0.8em;
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

a {
  text-decoration: none;
  color: #fff;
}
</style>
