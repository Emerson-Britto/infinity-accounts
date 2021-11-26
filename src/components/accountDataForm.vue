<template>
  <form id="form">
    <div>
      <div class="form-group">
        <label for="userName" class="input-labels">Username</label>
        <input
          id="userName"
          v-model="formData.displayName"
          class="input-data"
          type="text"
          name="input-mail"
          maxlength="20"
          placeholder="Ex: Alexa"
        />
      </div>
      <app-infor-message text="name too short!"></app-infor-message>
      <app-infor-message text="Username already exists"></app-infor-message>

      <div class="form-group">
        <label for="inMail" class="input-labels">E-mail</label>
        <input
          id="inMail"
          v-model="formData.mail"
          class="input-data"
          type="email"
          name="input-mail"
          maxlength="40"
          placeholder="Ex: alexashione@gmail.com"
        />
      </div>
      <app-infor-message text="invalid mail"></app-infor-message>
      <app-infor-message text="mail already exists"></app-infor-message>

      <div class="form-group">
        <label for="inPassword" class="input-labels">Password</label>
        <input
          id="inPassword"
          v-model="formData.password"
          class="input-data"
          type="password"
          name="input-password"
          maxlength="30"
          placeholder="Your password"
        />
      </div>
      <app-infor-message
        text="Minimum: 8 characters, one uppercase and lowercase letter, one number and one special character"
      >
      </app-infor-message>

      <div class="form-group">
        <label for="inRePassword" class="input-labels">re-Password</label>
        <input
          id="inRePassword"
          v-model="formData.rePassword"
          class="input-data"
          type="password"
          name="input-password"
          maxlength="30"
          placeholder="Your password"
        />
      </div>
      <app-infor-message text="password no match!"></app-infor-message>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "AccountDataForm",
  computed: {
    formData() {
      return store.getters.formDataSignUp;
    },
  },
});
</script>
<style scoped lang="scss">
#form {
  margin-top: 10px;
  display: flex;
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
</style>
