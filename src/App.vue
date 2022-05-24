<template>
  <main>
    <router-view />
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
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

</style>
