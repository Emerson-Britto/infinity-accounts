<template>
  <form id="form">
    <div class="nameSectionInfor">
      <div class="form-group">
        <label for="nameField" class="input-labels">Name</label>
        <input
          id="nameField"
          v-model="formData.name"
          class="input-data"
          type="text"
          name="input-name"
          maxlength="16"
          placeholder="Ex: Alexa"
        />
      </div>
      <app-infor-message text="name too short!"></app-infor-message>
      <div class="form-group">
        <label for="lastNameField" class="input-labels">Last Name</label>
        <input
          id="lastNameField"
          v-model="formData.lastName"
          class="input-data"
          type="text"
          name="input-lastName"
          maxlength="15"
          placeholder="Ex: shione"
        />
      </div>
      <app-infor-message text="last name too short!"></app-infor-message>
    </div>

    <select v-model="formData.gender" class="genderSection">
      <option class="genderSelect-option">Male</option>
      <option class="genderSelect-option">Female</option>
      <option class="genderSelect-option">Other</option>
    </select>

    <input
      v-model="formData.birthDate"
      class="dateSection"
      type="date"
      max="2003-12-31"
      min="1900-01-01"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "UserDataForm",
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
</style>
