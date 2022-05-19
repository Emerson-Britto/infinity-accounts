<template>
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
        placeholder="Your Username"
      />
    </div>
    <ErrorMessage class="msg-error" name="username" />

    <div class="form-group flexColumnStartMode">
      <label for="inMail" class="input-labels">E-mail</label>
      <Field
        id="inMail"
        v-model="formData.mail"
        class="input-data"
        type="email"
        name="mail"
        placeholder="Your email"
      />
    </div>
    <ErrorMessage class="msg-error" name="mail" />

    <button v-show="!events.onRequest" type="submit" class="btn-form-submit">
      Login
    </button>

    <LoadingForm v-show="events.onRequest"></LoadingForm>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingForm from "@/components/loadingForm.vue";
import store from "@/store";
import storage from "@/common/storage";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "FormSignIn",
  components: {
    Form,
    Field,
    ErrorMessage,
    LoadingForm,
  },
  computed: {
    events() {
      return store.getters.events;
    },
    formData() {
      return store.getters.formData;
    },
    schema() {
      return yup.object({
        username: yup.string().required(),
        mail: yup.string().required().email(),
      });
    },
  },
  methods: {
    submit(): void {
      store.dispatch("formSignInSubmit").then((res) => {
        // if (res.request.status == 428) {
        //   this.$router.push({ name: "verification" });
        //   return;
        // }
        if (res.request.status == 401) {
          alert("invalid username or mail");
          return;
        }
        if (res.request.status == 200) {
          storage.set("__SOCKET_CODE", res.data.socketCode);
          this.$router.push({ name: "verification" });
          // this.$router.push({ name: "myAccount" });
          return;
        }
      });
    },
  },
});
</script>
<style scoped lang="scss">
#form {
  margin-top: 10px;
  width: 100%;
  display: flex;
  text-align: center;
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
  font-size: 0.9em;
  margin: 0 10px;
  color: #c22526;
}

.btn-form-submit {
  margin: 15px 0;
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
