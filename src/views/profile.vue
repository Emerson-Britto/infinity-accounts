<template>
  <section id="viewPort">
    <section class="infors_general">
      <section class="infors_profile">
        <img
          class="infors_profile_Img"
          src="http://localhost:9872/static/imgs/defaultProfileImg/profile_default_blue.png"
          alt="profile imagem"
        />
        <h1 class="infors_profile_displayName">{{ displayName }}</h1>
        <p class="infors_profile_mail">{{ mail }}</p>
      </section>
      <section class="infors_accounts">
        <div class="infors_accounts_mail">
          <img class="mailIcon" :src="iconUrl('mailIcon')" />
          <div class="input_field">
            <label class="input_label" for="mail_input">Email ID</label>
            <input
              id="mail_input"
              class="data_input"
              type="email"
              name="mail"
              :value="mail"
              readonly
            />
          </div>
        </div>
        <div class="infors_accounts_lastSeen">
          <img class="historyIcon" :src="iconUrl('historyIcon')" />
          <div class="input_field">
            <label class="input_label" for="lastSeen">Last Seen</label>
            <p id="lastSeen" class="lastSeen">{{ lastSeen }}</p>
          </div>
        </div>
      </section>
    </section>
    <button class="default_btn">manager nordly account</button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import { nordlyApi, istatics } from "@/services";
import storage from "@/common/storage";

export default defineComponent({
  name: "Profile",
  data() {
    return {
      displayName: null,
      mail: null,
      lastSeen: "",
    };
  },
  beforeCreate() {
    nordlyApi
      .accountData(storage.getToken(), "account,currentDevice")
      .then((res: any) => {
        const { account, currentDevice = {} } = res.data;

        this.displayName = account.displayName;
        this.mail = account.mail;
        this.lastSeen = moment.unix(account.lastSeen).fromNow();

        console.log({ account });
        console.log({ currentDevice });
      });
  },
  methods: {
    iconUrl(name: string): string {
      return istatics.iconUrl({ name });
    },
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
  margin-bottom: 5px;
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
