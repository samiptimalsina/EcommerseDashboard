<template>
  <ProductDataTable :products="products" />
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import ProductDataTable from "@/components/Dashboard/Products/ProductDataTable.vue";
import { onMounted, ref } from "vue";

const products = ref([]);
const productStore = useProductStore();

onMounted(async () => {
  try {
    await productStore.fetchProducts();
    products.value = productStore.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<style></style>
