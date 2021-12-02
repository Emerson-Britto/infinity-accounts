<template>
  <Form id="form" :validation-schema="schema" @submit="nextStep">
    <div class="nameSectionInfor">
      <div class="form-group">
        <label for="nameField" class="input-labels">Name</label>
        <Field
          id="nameField"
          v-model="formData.name"
          class="input-data"
          name="name"
          maxlength="14"
          placeholder="Ex: Alexa"
        />
      </div>

      <div class="form-group">
        <label for="lastNameField" class="input-labels">Last Name</label>
        <Field
          id="lastNameField"
          v-model="formData.lastName"
          class="input-data"
          name="lastName"
          maxlength="14"
          placeholder="Ex: shione"
        />
      </div>
    </div>
    <ErrorMessage class="msg-error" name="name" />
    <ErrorMessage class="msg-error" name="lastName" />

    <select v-model="formData.gender" class="genderSection">
      <option class="genderSelect-option">Male</option>
      <option class="genderSelect-option">Female</option>
      <option class="genderSelect-option">Other</option>
    </select>

    <Field
      v-model="formData.birthDate"
      class="dateSection"
      type="date"
      name="birthDate"
      max="2003-12-31"
      min="1900-01-01"
    />
    <ErrorMessage class="msg-error" name="birthDate" />
    <button class="btn-form-submit">Next</button>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "UserDataForm",
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
        name: yup.string().required().min(4).max(14),
        lastName: yup.string().required().min(4).max(14),
        birthDate: yup.string().required(),
      });
    },
  },
  methods: {
    nextStep() {
      store.dispatch("signUpNextStep");
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

.nameSectionInfor {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 10px 10px;
}

.input-labels {
  color: #cfd1d0;
  margin: 0 0 15px 5px;
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
  width: 150px;
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

.msg-error {
  font-size: 0.9em;
  color: #c22526;
}

.genderSection {
  appearance: none;
  width: 52%;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url(http://localhost:9872/static/icons/expand_more_white_24dp.svg)
    no-repeat center right;
  background-position: 98% 50%;
  outline: none;
  border-bottom: 2px solid #404250;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px;
}

.genderSection:focus {
  border-bottom: 2px solid #858586;
}

.dateSection {
  text-align: center;
  width: 48%;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid #404250;
  border-radius: 8px;
  padding: 10px 5px;
  margin: 10px;
}

.dateSection:focus {
  border-bottom: 2px solid #858586;
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
