<template>
  <div id="viewPort">
    <section id="container">
      <section class="loginOption">
        <h2 class="instructionText">To continue, log in to Account Center.</h2>
        <h1 class="branding_in">NORDLY</h1>
      </section>
      <hr />
      <FormSwitch></FormSwitch>
      <FormSignIn v-if="formType == 'Sign In'"></FormSignIn>
      <FormSignUp v-if="formType == 'Sign Up'"></FormSignUp>
    </section>
    <section v-show="events.requestError" id="box_requestError">
      <h1 id="title_requestError">Ocorreu um erro, tente novamente</h1>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { istatics } from "@/services";
import FormSwitch from "@/components/formSwitch.vue";
import FormSignIn from "@/components/formSignIn.vue";
import FormSignUp from "@/components/formSignUp.vue";

export default defineComponent({
  name: "Forms",
  components: {
    FormSwitch,
    FormSignIn,
    FormSignUp,
  },
  computed: {
    formType() {
      return store.getters.formType;
    },
    events() {
      return store.getters.events;
    },
  },
  methods: {
    imgUrl(path: string): string {
      return istatics.imgUrl({ path });
    },
  },
});
</script>
<style scoped lang="scss">
@font-face {
  font-family: Padauk-Regular;
  src: url("../assets/fonts/Padauk-Regular.ttf");
}

#viewPort {
  text-align: center;
}

#box_requestError {
  border: 2px solid #830000;
  border-radius: 8px;
  background-color: #0f0000;
  margin: 0 auto;
  width: 260px;
}

#title_requestError {
  margin: 5px 0;
}

#container {
  background-color: rgb(0 0 0 /60%);
  border: 2px solid;
  border-image: linear-gradient(135deg, #000, #fff, #000) 1;
  width: 440px;
  height: auto;
  margin: 50px auto 30px auto;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
}

.loginOption {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: center;
  margin: 25px 0 35px 0;

  .instructionText {
    font-size: 1em;
  }

  .branding_in {
    font-family: "Padauk-Regular";
    font-size: 1.5em;
    margin: 20px 0;
  }

  .allOptions {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-around;
    margin-top: 35px;

    & .boxOption {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 60px;
      height: 60px;
      cursor: not-allowed;

      #optionImg {
        width: 30px;
      }
    }
  }
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
