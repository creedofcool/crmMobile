import Customers from "../views/Customers.vue";
import Me from "../views/Me.vue";
import customerDetail from "../views/CustomerDetail.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/customers",
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
    meta: { isBack: false },
  },
  {
    path: "/me",
    name: "me",
    component: Me,
    meta: { isBack: false },
  },
  {
    path: "/customerDetail",
    name: "customerDetail",
    component: customerDetail,
    meta: { isBack: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
