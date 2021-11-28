<template>
  <section id="container">
    <section class="loginOption">
      <h2 class="instructionText">To continue, log in to Account Center.</h2>
      <h1 class="branding_in">INFINITY</h1>
      <section v-if="false" class="allOptions">
        <div class="boxOption">
          <img
            id="optionImg"
            :src="branding('google')"
            alt="login With Google"
          />
          <p id="optionName">Google</p>
        </div>
        <div class="boxOption">
          <img
            id="optionImg"
            :src="branding('github')"
            alt="login With GitHub"
          />
          <p id="optionName">GitHub</p>
        </div>
        <div class="boxOption">
          <img
            id="optionImg"
            :src="branding('twitter')"
            alt="login With Twitter"
          />
          <p id="optionName">Twitter</p>
        </div>
        <div class="boxOption">
          <img id="optionImg" :src="branding('apple')" alt="login With Apple" />
          <p id="optionName">Apple</p>
        </div>
      </section>
    </section>
    <hr />
    <FormSwitch></FormSwitch>
    <FormSignIn v-if="formType == 'Sign In'"></FormSignIn>
    <FormSignUp v-if="formType == 'Sign Up'"></FormSignUp>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { getIcon } from "@/externals";
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
  },
  methods: {
    branding(iconName: string): string {
      return getIcon[iconName]();
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
  background-color: rgb(0 0 0 /60%);
  border: 2px solid;
  border-image: linear-gradient(135deg, #000, #fff, #000) 1;
  width: 440px;
  height: auto;
  margin-bottom: 30px;
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
