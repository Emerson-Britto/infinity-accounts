<template>
  <section id="container">
    <h1>HELLO</h1>
    <h1>HELLO</h1>
    <h1>HELLO</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "VerificationForm",
  computed: {
    formData() {
      return store.getters.formDataSignUp;
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
  background-color: rgb(0 0 0 /60%);
  border: 2px solid;
  border-image: linear-gradient(135deg, #000, #fff, #000) 1;
  width: 440px;
  height: auto;
  margin: 50px auto;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
