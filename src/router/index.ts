import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Forms from "../views/Forms.vue";
import VerificationForm from "../views/VerificationForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/verification",
    name: "verification",
    component: VerificationForm,
  },
  {
    path: "/myaccount",
    name: "myAccount",
    component: () =>
      import(/* webpackChunkName: "myAccount" */ "../views/myAccount.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
