<template>
  <div>
    <section>
      <UserDataForm v-if="formSignUpStep === 0"></UserDataForm>
      <AccountDataForm v-if="formSignUpStep === 1"></AccountDataForm>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import UserDataForm from "@/components/userDataForm.vue";
import AccountDataForm from "@/components/accountDataForm.vue";

export default defineComponent({
  name: "FormSignUp",
  components: {
    UserDataForm,
    AccountDataForm,
  },
  computed: {
    formSignUpStep() {
      return store.getters.formSignUpStep;
    },
  },
});
</script>
<style scoped lang="scss"></style>
