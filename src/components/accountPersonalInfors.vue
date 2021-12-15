<template>
  <section class="wrapper">
    <section class="personal_infors">
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('personIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Name</label>
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
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('calendarIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Birth Day</label>
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
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('callIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Phone Number</label>
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
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('sentiment_satisfiedIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">NickName</label>
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
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('flagIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Country</label>
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
      <div class="personal_infors_infor">
        <img class="input_icon" :src="getIcon('languageIcon')" />
        <div class="input_field">
          <label class="input_label" for="mail_input">Language</label>
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
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getIcon } from "@/externals";

export default defineComponent({
  name: "AccountPersonalInfors",
  methods: {
    getIcon(iconName: string): string {
      return getIcon[iconName]();
    },
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #4c4e4f;
  border-radius: 18px;
  width: 80vw;
  height: 300px;
}

.personal_infors {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 90%;

  &_infor {
    display: flex;
    margin: 14px 10px;
  }
}

.input_icon {
  margin: 0 20px 0 0;
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
  width: 330px;
  padding: 5px 10px;
  background: transparent;
  border-bottom: 1px solid #181a25;
}
</style>
