<template>
  <section id="viewPort">
    <header v-show="true" id="header">
      <router-link to="myaccount">
        <h1 class="branding_in"><strong>Nordly</strong> accounts</h1>
      </router-link>
      <div class="shortCuts_list">
        <router-link to="myaccount" class="shortCuts">Home</router-link>
        <router-link to="profile" class="shortCuts">Profile</router-link>
        <router-link to="" class="shortCuts">Security</router-link>
        <router-link to="" class="shortCuts">Devices</router-link>
      </div>
      <div class="right_header_wrapper">
        <button id="logout_btn" @click="logout">Log out</button>
        <img class="headerIcon" :src="iconUrl('account_circle')" />
      </div>
    </header>
    <section id="accountOptions_grid">
      <router-link to="profile" class="options profile">
        <img
          class="profile_Img"
          src="https://cdn-istatics.herokuapp.com/static/imgs/defaultProfile/profile_default_blue.png"
          alt="profile imagem"
        />
        <h1 class="profile_displayName">{{ username }}</h1>
        <p class="profile_mail">{{ mail }}</p>
      </router-link>
      <div class="options recover"></div>
      <div class="options privacity"></div>
      <div class="options security"></div>
      <div class="options local"></div>
      <div class="options services"></div>
      <router-link to="devices" class="options devices">
        <section class="titles_wrapper">
          <h2 class="title">Your Devices</h2>
          <p class="description">
            You’re currently signed in to your Nordly Account on these devices.
          </p>
        </section>
        <section class="devices_list">
          <div
            v-for="(device, index) in devices"
            :key="device.ip"
            class="device"
          >
            <div class="device_icon-wrapper">
              <img
                class="device_icon"
                :src="iconUrl('device_unknown', 'black')"
                alt="Device Icon"
              />
            </div>
            <div class="device_infors">
              <h3 class="device_infors-os">{{ device.os.split(" ")[0] }}</h3>
              <p class="device_infors-location">{{ device.location }}</p>
              <div v-if="index === 0" class="matched_device">
                <div>
                  <img
                    id="matched_icon"
                    :src="iconUrl('check_circle', 'black')"
                    alt="Matched deviced"
                  />
                </div>
                <p>This device</p>
              </div>
            </div>
          </div>
        </section>
      </router-link>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nordlyApi, istatics } from "@/services";

export default defineComponent({
  name: "MyAccount",
  data() {
    return {
      username: null,
      mail: null,
      devices: [],
    };
  },
  beforeCreate() {
    nordlyApi
      .accountData("account,devices")
      .then((res: any) => {
        const { account, devices } = res.data;
        this.username = account.username;
        this.mail = account.mail;
        this.devices = devices;

        console.log(devices);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    iconUrl(name: string, color?: string): string {
      return istatics.iconUrl({ name, color });
    },
    logout() {
      nordlyApi.logout().then(() => {
        this.$router.push({ name: "Forms" });
      });
    },
  },
});
</script>
<style scoped lang="scss">
#viewPort {
  margin: 0;
  display: grid;
  place-items: center;
  width: 99vw;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  width: 99vw;
  height: 9vh;
  margin-bottom: 5vh;
}

.branding_in {
  font-family: "Padauk-Regular", "Gill Sans";
  font-size: 1.5em;
  margin: 0 40px;
}

.shortCuts_list {
  display: flex;
  justify-content: space-around;
  width: 40%;
}

.shortCuts {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.right_header_wrapper {
  display: flex;
  align-items: center;
}

#logout_btn {
  border: none;
  border: 2px solid #e10000;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 0.9em;
  background-color: rgba(255, 28, 29, 0.47);
}

.headerIcon {
  width: 30px;
  margin: 0 40px;
}

strong {
  font-weight: bold;
}

#accountOptions_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px 10px;
  width: 80vw;
  height: 95vh;
  margin-bottom: 8vh;
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

.devices {
  grid-column: 2 / 3;
  grid-row: 3 / 5;
  flex-direction: column;

  .titles_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 85%;
    height: 25%;
    margin-bottom: 10px;

    .title {
      font-size: 1.1em;
    }

    .description {
      opacity: 0.5;
    }
  }

  .devices_list {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 60%;

    .device {
      display: flex;
      align-items: center;
      height: 40%;
      border-radius: 8px;
      background-color: #000006;
      padding: 5px 0;

      &_icon-wrapper {
        margin: 0 20px;
        width: 30px;
      }

      &_icon {
        filter: invert(100%);
        width: 100%;
      }

      &_infors {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;

        &-location {
          font-size: 0.9em;
          opacity: 0.8;
        }

        .matched_device {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin: 5px 0;

          & > div {
            display: grid;
            place-items: center;
            width: 20px;

            #matched_icon {
              filter: invert(100%);
              width: 100%;
            }
          }

          & > p {
            font-size: 0.9em;
          }
        }
      }
    }
  }
}
</style>
