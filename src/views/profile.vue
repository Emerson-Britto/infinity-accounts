<template>
  <section id="viewPort">
    <AccountInforGeneral></AccountInforGeneral>
    <button class="default_btn">manager infinity account</button>
    <section class="infors_personal"></section>
    <h2 class="field_label">Personal infors</h2>
    <AccountPersonalInfors></AccountPersonalInfors>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountInforGeneral from "@/components/accountInforsGeneral.vue";
import AccountPersonalInfors from "@/components/accountPersonalInfors.vue";
export default defineComponent({
  name: "Profile",
  components: {
    AccountInforGeneral,
    AccountPersonalInfors,
  },
});
</script>
<style scoped lang="scss">
#viewPort {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99vw;
}

.field_label {
  margin: 16px 0;
  font-size: 1.2em;
}

.default_btn {
  margin: 20px 0;
  padding: 10px 18px;
  border-radius: 16px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 0.9em;
  background-color: #1b1f31;
  cursor: pointer;
}
</style>
