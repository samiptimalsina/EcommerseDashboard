<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Product Management</h1>
    <ProductDataTable
      :products="productStore.products"
      :totalProducts="productStore.totalProducts"
      :currentPage="productStore.currentPage"
      :itemsPerPage="productStore.itemsPerPage"
      @page-changed="handlePageChange"
      @delete="handleDeleteProduct"
      @search="handleSearch"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ProductDataTable from "@/components/Dashboard/Products/ProductDataTable.vue";
import { useProductStore } from "@/stores/product";

const productStore = useProductStore();

// Ensure default currentPage is set to 1
if (!productStore.currentPage || productStore.currentPage === 0) {
  productStore.currentPage = 1;
}

const fetchProducts = async (itemsPerPage, currentPage) => {
  await productStore.fetchProducts(itemsPerPage, currentPage);
};

// Handles page change
const handlePageChange = (page) => {
  productStore.currentPage = page;
  fetchProducts(productStore.itemsPerPage, page);
};

// Handles product deletion
const handleDeleteProduct = async (id) => {
  await productStore.deleteProduct(id);
  fetchProducts(productStore.itemsPerPage, productStore.currentPage);
};

// Handles search
const handleSearch = (query) => {
  productStore.searchQuery = query;
  fetchProducts(productStore.itemsPerPage, 1);
};

// Fetch products on component mount
onMounted(() => {
  fetchProducts(productStore.itemsPerPage, productStore.currentPage);
});
</script>
