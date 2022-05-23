import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import storage from "../common/storage";
import { nordlyApi } from "../services";
import { urlEncoding } from "../helpers";
import Forms from "../views/Forms.vue";
import VerificationForm from "../views/VerificationForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Forms",
    component: Forms,
    beforeEnter: (to, from, next) => {
      if (storage.hasToken()) next({ name: "myAccount" });
      else next();
    },
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
    beforeEnter: (to, from, next) => {
      const after = sessionStorage.getItem("__afterUrl");
      if (!storage.hasToken()) next({ name: "Forms" });
      else if (after) next({ name: "SSO", query: { after } });
      else next();
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile.vue"),
    beforeEnter: (to, from, next) => {
      if (!storage.hasToken()) next({ name: "Forms" });
      else next();
    },
  },
  {
    path: "/sso",
    name: "SSO",
    component: Forms,
    beforeEnter: async (to, from, next) => {
      const after = String(to.query["after"] || "");

      if (!storage.hasToken() || !after) {
        sessionStorage.setItem("__afterUrl", after);
        return next({ name: "Forms" });
      }

      const fastToken = await nordlyApi
        .createFastToken(after)
        .then((r: any) => r.data.KEY)
        .catch((err: any) => {
          console.error(err);
          next({ name: "myAccount" });
        });

      if (!fastToken) return;
      const passQuery = `?pass=${fastToken}`;
      const afterUrl = urlEncoding(after).decoder();
      window.location.href = afterUrl + passQuery;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
