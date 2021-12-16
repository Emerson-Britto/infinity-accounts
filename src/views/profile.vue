<template>
  <section id="viewPort">
    <AccountInforGeneral :data="generalInfor"></AccountInforGeneral>
    <button class="default_btn">manager infinity account</button>
    <section class="infors_personal"></section>
    <h2 class="field_label">Personal infors</h2>
    <AccountPersonalInfors :data="personalInfor"></AccountPersonalInfors>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from 'moment';
import AccountInforGeneral from "@/components/accountInforsGeneral.vue";
import AccountPersonalInfors from "@/components/accountPersonalInfors.vue";
import { accountDataService } from "@/common/accountDataService";
import { Storage } from "@/common/storage";

export default defineComponent({
  name: "Profile",
  components: {
    AccountInforGeneral,
    AccountPersonalInfors,
  },
  data() {
    return {
      generalInfor: {
        displayName: null,
        mail: null,
        lastSeen: "",
      },
      personalInfor: {
        name: "",
        birthDate: null,
        phoneNumber: "no phone number",
        displayName: null,
        country: "empty",
        language: "empty",
      },
    };
  },
  beforeCreate() {
    accountDataService
      .getAccountData(Storage.getToken(), "account,currentDevice")
      .then((res) => {
        const { account, currentDevice } = res.data;

        this.generalInfor.displayName = account.displayName;
        this.generalInfor.mail = account.mail;
        this.generalInfor.lastSeen = moment.unix(account.lastSeen).fromNow();

        this.personalInfor.name = `${account.name} ${account.lastName}`;
        this.personalInfor.birthDate = account.birthDate;
        this.personalInfor.phoneNumber = "empty";
        this.personalInfor.displayName = account.displayName;
        this.personalInfor.country = "empty";
        this.personalInfor.language = "empty";

        console.log(account);
        console.log(currentDevice);
      });
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
