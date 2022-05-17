<template>
  <main>
    <header v-show="false" id="header">
      <router-link to="myaccount">
        <h1 class="branding_in">NORDLY</h1>
      </router-link>
      <div class="shortCuts_list">
        <router-link to="myaccount" class="shortCuts">Home</router-link>
        <router-link to="profile" class="shortCuts">Profile</router-link>
        <router-link to="" class="shortCuts">Security</router-link>
        <router-link to="" class="shortCuts">Devices</router-link>
      </div>
      <div>
        <img class="headerIcon" :src="iconUrl('account_circle')" />
      </div>
    </header>
    <router-view />
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { istatics } from "@/services";

export default defineComponent({
  name: "App",
  methods: {
    iconUrl(name: string): string {
      return istatics.iconUrl({ name });
    },
  },
});
</script>
<style lang="scss">
@font-face {
  font-family: Padauk-Regular;
  src: url("./assets/fonts/Padauk-Regular.ttf");
}

* {
  margin: 0;
  padding: 0;
  color: #fff;
  text-decoration: none;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}

h1,
p,
h2,
h3 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
  box-sizing: border-box;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

html {
  background-color: #000;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #040007;
  width: 99vw;
  height: 9vh;
  margin-bottom: 6vh;
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

.headerIcon {
  width: 30px;
  margin: 0 40px;
}
</style>
