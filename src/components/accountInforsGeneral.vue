<template>
  <section class="infors_general">
    <section class="infors_profile">
      <img
        class="infors_profile_Img"
        src="http://localhost:9872/static/imgs/defaultProfileImg/profile_default_blue.png"
        alt="profile imagem"
      />
      <h1 class="infors_profile_displayName">Emerson-Britto</h1>
      <p class="infors_profile_mail">emersonbritto987@gmail.com</p>
    </section>
    <section class="infors_accounts">
      <div class="infors_accounts_mail">
        <img class="mailIcon" :src="getIcon('mailIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Email ID</label>
          <input
            id="mail_input"
            class="data_input"
            type="email"
            name="mail"
            value="emersonbritto987@gmail.com"
            readonly
          />
        </div>
      </div>
      <div class="infors_accounts_lastSeen">
        <img class="historyIcon" :src="getIcon('historyIcon')" />
        <div class="input_field">
          <label class="input_label" for="lastSeen">Last Seen</label>
          <p id="lastSeen" class="lastSeen">Last seen on 6 minutes ago</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getIcon } from "@/externals";

export default defineComponent({
  name: "AccountInforGeneral",
  methods: {
    getIcon(iconName: string): string {
      return getIcon[iconName]();
    },
  },
});
</script>
<style scoped lang="scss">
.infors_general {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #4c4e4f;
  border-radius: 18px;
  width: 80vw;
  height: 300px;
}

.infors_profile {
  display: flex;
  flex-direction: column;
  align-items: center;

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
    color: #989e9e;
  }
}

.infors_accounts {
  display: flex;
  flex-direction: column;

  &_mail {
    display: flex;
    margin: 14px 0;
  }

  &_lastSeen {
    display: flex;
    margin: 14px 0;
  }
}

.lastSeen {
  margin: 5px 0;
}

.mailIcon {
  margin: 0 20px;
}

.historyIcon {
  width: 28px;
  margin: 0 20px;
}

.input_label {
  font-size: 0.8em;
  color: #989e9e;
}

.input_field {
  display: flex;
  flex-direction: column;
}

.data_input {
  outline: none;
  width: 400px;
  padding: 5px 10px;
  background: transparent;
  border-bottom: 1px solid #181a25;
}
</style>
