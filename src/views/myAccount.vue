<template>
  <section id="viewPort">
    <section id="accountOptions_grid">
      <router-link to="profile" class="options profile">
        <img
          class="profile_Img"
          src="http://localhost:9872/static/imgs/defaultProfileImg/profile_default_blue.png"
          alt="profile imagem"
        />
        <h1 class="profile_displayName">{{ displayName }}</h1>
        <p class="profile_mail">{{ mail }}</p>
      </router-link>
      <div class="options recover"></div>
      <div class="options privacity"></div>
      <div class="options security"></div>
      <div class="options local"></div>
      <div class="options devices"></div>
      <div class="options services"></div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nordlyApi } from "@/services";
import storage from "@/common/storage";

export default defineComponent({
  name: "MyAccount",
  data() {
    return {
      displayName: null,
      mail: null,
    };
  },
  beforeCreate() {
    nordlyApi.accountData(storage.getToken(), "account").then((res: any) => {
      const { account } = res.data;
      this.displayName = account.displayName;
      this.mail = account.mail;
    });
  },
});
</script>
<style scoped lang="scss">
#viewPort {
  margin: 0;
  display: grid;
  place-items: center;
  width: 99vw;
  height: 100vh;
}

#accountOptions_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px 10px;
  width: 80vw;
  height: 90vh;
}

.options {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #4c4e4f;
  border-radius: 17px;
  cursor: pointer;
  transition: 400ms;

  &:hover {
    background-color: #020409;
  }
}

.profile {
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 1 / 3;

  &_Img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  &_displayName {
    margin: 15px 0;
  }

  &_mail {
    font-size: 0.9em;
  }
}

.local {
  grid-column: 3 / 4;
  grid-row: 2 / 4;
}

.services {
  grid-column: 2 / 3;
  grid-row: 3 / 5;
}
</style>
