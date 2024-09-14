import { createRouter, createWebHistory } from "vue-router";
import LayoutComponent from "@/layouts/LayoutComponent.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import RegisterPage from "@/views/Auth/RegisterPage.vue";
import { requireAuth, preventAuth } from "@/router/authGuard";

const routes = [
  {
    path: "/",
    component: LayoutComponent,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
      },
      {
        path: "about",
        name: "about",
        component: AboutPage,
      },
      {
        path: "register",
        name: "register",
        component: RegisterPage,
        beforeEnter: preventAuth, // Add the preventAuth guard here
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth/LoginPage.vue"),
        beforeEnter: preventAuth,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    beforeEnter: requireAuth,
    children: [
      {
        path: "overview",
        name: "dashboard-overview",
        component: () => import("@/views/Dashboard/OverView.vue"),
      },
      {
        path: "users",
        name: "UserList",
        component: () => import("@/views/Dashboard/users/UserList.vue"),
      },

      {
        path: "/user/edit/:id",
        name: "EditUser",
        component: () => import("@/views/Dashboard/users/EditUser.vue"),
      },

      {
        path: "products",
        name: "ProductList",
        component: () => import("@/views/Dashboard/Products/ProductList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
