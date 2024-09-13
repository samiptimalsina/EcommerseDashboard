import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    roles: [],
    permissions: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get("/users");
        this.users = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get(`/users/${id}/edit`);
        this.users = [response.data]; // Ensure users is an array with one user
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUserById(id, userData) {
      this.loading = true;
      try {
        await axiosInstance.post(`/users/${id}/update`, userData);
        this.fetchUsers();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
