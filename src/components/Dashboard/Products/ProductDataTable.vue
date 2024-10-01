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
        <tr
          v-for="(product, index) in paginatedProducts"
          :key="product.id"
          class="hover:bg-gray-100"
        >
          <td class="py-4 px-6 border-b border-gray-200">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
          </td>
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
            <DeleteButton @delete="handleDelete(product.id)" />
          </td>
        </tr>
        <tr v-if="!paginatedProducts.length">
          <td colspan="12" class="text-center py-4">No products available.</td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-600">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} of
        {{ filteredProducts.length }}
      </span>
      <div class="pagination-controls flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span
          v-for="page in totalPages"
          :key="page"
          class="page-number cursor-pointer px-3 py-1 border rounded-lg"
          :class="{
            'bg-blue-500 text-white': currentPage === page,
            'text-blue-500': currentPage !== page,
          }"
          @click="goToPage(page)"
        >
          {{ page }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import DeleteButton from "@/components/Buttons/DeleteButton.vue";
import EditButton from "@/components/Buttons/EditButton.vue";
import AddButton from "@/components/Buttons/AddButton.vue";
import SearchFilter from "@/components/Filters/SearchForm.vue";
import { format } from "date-fns";

// Define props
const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
  totalProducts: {
    type: Number,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["delete", "page-changed"]);

// Setup state variables
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Make this reactive
const itemsPerPageOptions = [5, 10, 20, 50]; // Options for items per page

// Computed properties
const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const totalPages = computed(() => {
  return Math.ceil(props.totalProducts / itemsPerPage.value);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Pagination methods
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("page-changed", currentPage.value);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit("page-changed", currentPage.value);
  }
}

function goToPage(page) {
  currentPage.value = page;
  emit("page-changed", currentPage.value);
}

function resetPagination() {
  currentPage.value = 1; // Reset to first page when items per page changes
  emit("page-changed", currentPage.value);
}

// Handle delete action
function handleDelete(id) {
  emit("delete", id);
}

// Utility function to format date
function formatDateString(dateString) {
  return format(new Date(dateString), "dd/MM/yyyy HH:mm");
}

// Handle search event
function handleSearchEvent(query) {
  searchQuery.value = query;
  resetPagination();
}
</script>

<style scoped>
/* Add any additional styles here */
.page-number {
  transition: background-color 0.3s ease;
}
</style>
