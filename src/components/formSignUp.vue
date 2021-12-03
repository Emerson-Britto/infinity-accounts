<template>
  <div>
    <section id="viewPort">
      <UserDataForm v-if="formSignUpStep === 0"></UserDataForm>
      <AccountDataForm v-if="formSignUpStep === 1"></AccountDataForm>
      <PasswordForm v-if="formSignUpStep === 2"></PasswordForm>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import UserDataForm from "@/components/userDataForm.vue";
import AccountDataForm from "@/components/accountDataForm.vue";
import PasswordForm from "@/components/passwordForm.vue";

export default defineComponent({
  name: "FormSignUp",
  components: {
    UserDataForm,
    AccountDataForm,
    PasswordForm,
  },
  computed: {
    formSignUpStep() {
      return store.getters.formSignUpStep;
    },
  },
});
</script>
<style scoped lang="scss">
#viewPort {
  text-align: center;
}
</style>
