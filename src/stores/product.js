import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),

  actions: {
    async fetchProducts() {
      try {
        const response = await axiosInstance.get("/products");
        this.products = response.data;
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },
  },
});
