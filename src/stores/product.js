import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    itemsPerPage: 10,
  }),

  actions: {
    async fetchProducts(itemsPerPage, currentPage) {
      try {
        const response = await axiosInstance.get(
          `/products?itemsPerPage=${itemsPerPage}&page=${currentPage}`
        );
        // Ensure products is an array
        this.products = response.data.data || [];
        this.totalProducts = response.data.total || 0;
        this.currentPage = response.data.current_page || 1;
        this.itemsPerPage = itemsPerPage;
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },

    async saveProduct(product) {
      try {
        let response;
        if (product.id) {
          response = await axiosInstance.put(
            `/products/${product.id}`,
            product
          );
          this.updateProductInState(response.data);
        } else {
          response = await axiosInstance.post("/products", product);
          this.products.push(response.data);
        }

        return response.data;
      } catch (err) {
        console.error("Error saving product:", err);
        throw err;
      }
    },

    updateProductInState(updatedProduct) {
      const index = this.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    },

    // Delete a product (optional)
    async deleteProduct(productId) {
      try {
        await axiosInstance.delete(`/products/${productId}`);
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    },
  },
});
