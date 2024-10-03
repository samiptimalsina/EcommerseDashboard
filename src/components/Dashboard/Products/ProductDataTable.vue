<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow-md">
    <div class="flex justify-between mb-4">
      <SearchFilter @search="handleSearchEvent" />
      <AddButton :link="{ name: 'AddProduct' }" buttonText="Add New Product" />
    </div>

    <div class="mb-4">
      <label for="itemsPerPage" class="text-gray-600">Items per page:</label>
      <select
        v-model="itemsPerPage"
        id="itemsPerPage"
        class="ml-2 border border-gray-300 rounded"
        @change="resetPagination"
      >
        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">SN</th>
          <th class="py-3 px-6 text-left">Product Name</th>
          <th class="py-3 px-6 text-left">Product Slug</th>
          <th class="py-3 px-6 text-left">Product Description</th>
          <th class="py-3 px-6 text-left">Image</th>
          <th class="py-3 px-6 text-left">Qty</th>
          <th class="py-3 px-6 text-left">Actual Price</th>
          <th class="py-3 px-6 text-left">Sale Price</th>
          <th class="py-3 px-6 text-left">Discount</th>
          <th class="py-3 px-6 text-left">Created At</th>
          <th class="py-3 px-6 text-left">Updated At</th>
          <th class="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td class="py-4 px-6 border-b border-gray-200">{{ index + 1 }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.name }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.slug }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.description }}</td>
          <td class="py-4 px-6 border-b border-gray-200">
            <img
              :src="product.feature_image"
              alt="Product Image"
              class="h-16 w-16 object-cover rounded"
            />
          </td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.qty }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.actual_price }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.sale_price }}</td>
          <td class="py-4 px-6 border-b border-gray-200">{{ product.discount }}</td>
          <td class="py-4 px-6 border-b border-gray-200">
            {{ formatDateString(product.created_at) }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200">
            {{ formatDateString(product.updated_at) }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200 flex space-x-2">
            <EditButton :link="{ name: 'EditProduct', params: { id: product.id } }" />
            <DeleteButton @delete="deleteProduct(product.id)" />
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="12" class="text-center py-4">No products available.</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-4">
      <PaginationComponent
        :currentPage="currentPage"
        :totalProducts="totalProducts"
        :itemsPerPage="itemsPerPage"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { useProductStore } from "@/stores/product";
import DeleteButton from "@/components/Buttons/DeleteButton.vue";
import EditButton from "@/components/Buttons/EditButton.vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import SearchFilter from "@/components/Filters/SearchForm.vue";
import PaginationComponent from "@/components/Dashboard/PaginationComponent.vue";

const productStore = useProductStore();
const {
  products,
  totalProducts,
  currentPage,
  searchQuery: storeSearchQuery,
} = storeToRefs(productStore);

const itemsPerPage = ref(10); // You can change this to your desired items per page
const searchQuery = ref(storeSearchQuery.value);
const itemsPerPageOptions = ref([5, 10, 15, 20]); // Define your items per page options

// Watch for changes in searchQuery and update the store's searchQuery
watch(searchQuery, (newQuery) => {
  productStore.searchQuery = newQuery; // Sync with the store
  fetchProducts(currentPage.value, itemsPerPage.value, newQuery);
});

// Fetch products based on current page, items per page, and search query
const fetchProducts = (pageNumber, itemsPerPage, searchQuery) => {
  productStore.fetchProducts(itemsPerPage, pageNumber, searchQuery); // Make sure to pass itemsPerPage first
};

// Handle page change from pagination component
const handlePageChange = (page) => {
  fetchProducts(page, itemsPerPage.value, searchQuery.value);
};

// Delete product and refresh product list
const deleteProduct = async (productId) => {
  const response = await productStore.deleteProduct(productId);
  if (response) {
    fetchProducts(currentPage.value, itemsPerPage.value, searchQuery.value); // Refresh products after deletion
  }
};

// Handle search event
const handleSearchEvent = (query) => {
  searchQuery.value = query; // Update the search query
};

// Reset pagination and fetch products
const resetPagination = () => {
  currentPage.value = 1; // Reset to the first page
  fetchProducts(currentPage.value, itemsPerPage.value, searchQuery.value); // Fetch products again
};

// Format date string (implement this according to your requirements)
const formatDateString = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchProducts(currentPage.value ?? 1, itemsPerPage.value, searchQuery.value); // Fetch products on mount
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
