import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Storage } from "../common/storage";
import { formService } from "../common/formService";
import { ShortCutUrl } from "../common/utils/shortcutUrl";
import Forms from "../views/Forms.vue";
import VerificationForm from "../views/VerificationForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Forms",
    component: Forms,
    beforeEnter: (to, from, next) => {
      if (Storage.hasToken()) next({ name: "myAccount" });
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
      if (!Storage.hasToken()) next({ name: "Forms" });
      else next();
    },
  },
  {
    path: "/sso",
    name: "SSO",
    component: Forms,
    beforeEnter: async (to, from, next) => {
      console.log({ from, to });
      if (!Storage.hasToken() || !to.query.after) next({ name: "Forms" });
      else {
        const res = await formService
          .createFastToken(Storage.getToken(), String(to.query["after"]))
          .catch((err) => {
            console.error(err);
            next({ name: "myAccount" });
          });
        const TOKEN_QUERY = `?pass=${res.data.KEY}`;
        const AFTER_URL = ShortCutUrl.normalizeUrl(String(to.query["after"]));
        window.location.href = AFTER_URL + TOKEN_QUERY;
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
