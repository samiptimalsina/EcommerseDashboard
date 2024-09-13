import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    password: "",
    name: "",
    isLoggedIn: !!localStorage.getItem("authToken"),
    errors: {},
    token: localStorage.getItem("authToken"),
    auth_user: [],
  }),

  actions: {
    async login() {
      try {
        const response = await axiosInstance.post("/login", {
          email: this.email,
          password: this.password,
        });
        this.token = response.data.token;
        this.isLoggedIn = true;
        localStorage.setItem("authToken", this.token);
        router.push({ name: "dashboard-overview" });

        console.log("Login successful:", response.data);
      } catch (error) {
        console.error("Login error:", error);
      }
    },

    async register(formData) {
      try {
        const response = await axiosInstance.post("/register", formData);
        this.token = response.data.token;
        localStorage.setItem("authToken", this.token);
        this.errors = {};
        this.isLoggedIn = true;
        console.log("Registration successful:", response.data);
        router.push({ name: "dashboard-overview" });
      } catch (error) {
        const errors = error.response?.data?.errors || {
          general: "Registration failed",
        };
        this.errors = errors;
        console.error("Registration error:", errors);
      }
    },

    async logOut() {
      this.isLoggedIn = false;
      this.token = "";
      localStorage.removeItem("authToken");
      router.push({ name: "login" });
    },

    async authUser() {
      try {
        const response = await axiosInstance.get("/user");
        this.auth_user = response.data;
      } catch (err) {
        console.error("Error authenticating user");
      }
    },
  },
});
