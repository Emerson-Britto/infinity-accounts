import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const socket = io("ws://localhost:7050");
const app = createApp(App);

app.provide("$store", store);
app.use(store);
app.use(router);
app.use(VueSocketIOExt, socket);
app.mount("#app");
