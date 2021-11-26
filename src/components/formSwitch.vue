<template>
  <div id="switch-background" @click="switchBtn()">
    <p id="switchTextBackground-SignIn">Sign in</p>
    <button
      id="switch-btn"
      :class="formType == 'Sign In' ? 'switch-btn-SignIn' : 'switch-btn-SignUp'"
    >
      {{ formType }}
    </button>
    <p id="switchTextBackground-SignUp">Sign up</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "FormSwitch",
  computed: {
    formType() {
      return store.getters.formType;
    },
  },
  methods: {
    switchBtn(): void {
      store.dispatch("switchForm");
    },
  },
});
</script>

<style scoped lang="scss">
#switch-background {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin: 25px auto;
  width: 180px;
  height: 35px;
  border-radius: 10px;
  cursor: pointer;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#switchTextBackground-SignIn {
  color: #000;
}

#switchTextBackground-SignUp {
  color: #000;
  margin-left: 10px;
}

#switch-btn {
  position: absolute;
  border: none;
  width: 100px;
  height: 35px;
  font-size: 1em;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: 500ms;
}

.switch-btn-SignIn {
  background-color: #3f3d3a;
  left: 0;
  box-shadow: 5px 0px 30px rgb(0 0 0 /70%);
}

.switch-btn-SignUp {
  background-color: #3f3d3a;
  left: 81px;
  box-shadow: -5px 0px 30px rgb(0 0 0 /70%);
}
</style>
