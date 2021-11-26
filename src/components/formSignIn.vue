<template>
  <form id="form" class="flexColumnCenterMode">
    <div class="form-group flexColumnStartMode">
      <label for="inMail" class="input-labels">E-mail</label>
      <input
        id="inMail"
        class="input-data"
        type="email"
        name="input-mail"
        placeholder="Your email"
      />
    </div>
    <app-infor-message text="invalid email"></app-infor-message>

    <div class="form-group flexColumnStartMode">
      <label for="inPassword" class="input-labels">Password</label>
      <input
        id="inPassword"
        class="input-data"
        type="password"
        name="input-password"
        placeholder="Your password"
      />
    </div>
    <app-infor-message text="incorrect password"></app-infor-message>

    <button type="submit" class="btn-form-submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormSignIn",
});
</script>
<style scoped lang="scss">
#form {
  margin-top: 10px;
}

.flexColumnCenterMode {
  display: flex;
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
  margin: 10px 0 10px 0;
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
  width: 300px;
  height: 25px;
}

.input-data:focus {
  border-bottom: 2px solid #858586;
}

.btn-form-submit {
  margin: 10px 0 15px 0;
  border: none;
  cursor: pointer;
  color: #e0dfde;
  font-size: 1.1em;
  background-color: transparent;
  padding: 5px 10px;
  border: 2px solid #fff;
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
