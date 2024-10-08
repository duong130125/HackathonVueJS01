import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
  },
  {
    path: "/admin/manager-user",
    component: () =>
      import(/* webpackChunkName: "manager-user" */ "@/views/Users.vue"),
  },
  {
    path: "/admin/manager-product",
    component: () =>
      import(/* webpackChunkName: "manager-product" */ "@/views/Products.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
