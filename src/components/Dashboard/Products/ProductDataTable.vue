<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow-md">
    <div class="flex mx-0 justify-between mb-4">
      <SearchFilter @search="handleSearchEvent" />
      <AddButton :link="{ name: 'AddProduct' }" buttonText="Add New Product" />
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
            {{ (props.currentPage - 1) * props.itemsPerPage + index + 1 }}
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
        Showing {{ (props.currentPage - 1) * props.itemsPerPage + 1 }} -
        {{ Math.min(props.currentPage * props.itemsPerPage, props.totalProducts) }} of
        {{ props.totalProducts }}
      </span>
      <div class="pagination-controls flex space-x-2">
        <button
          @click="prevPage"
          :disabled="props.currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span
          v-for="page in totalPages"
          :key="page"
          class="page-number cursor-pointer px-3 py-1 border rounded-lg"
          :class="{
            'bg-blue-500 text-white': props.currentPage === page,
            'text-blue-500': props.currentPage !== page,
          }"
          @click="goToPage(page)"
        >
          {{ page }}
        </span>
        <button
          @click="nextPage"
          :disabled="props.currentPage === totalPages"
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
    default: () => [],
    required: true,
  },
  totalProducts: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["delete", "fetchProducts"]);
const searchInput = ref("");

// Calculate total pages
const totalPages = computed(() => {
  return Math.ceil(props.totalProducts / props.itemsPerPage) || 1;
});

// Filter products based on search input
const productFilter = computed(() => {
  if (!props.products || !Array.isArray(props.products)) {
    return [];
  }

  return props.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

// Get paginated products
const paginatedProducts = computed(() => {
  if (!productFilter.value || !Array.isArray(productFilter.value)) {
    return []; // Return empty if there's no valid filtered data
  }

  const startIndex = (props.currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return productFilter.value.slice(startIndex, endIndex);
});

// Format date
const formatDateString = (dateString) => {
  return format(new Date(dateString), "MMM dd, yyyy HH:mm:ss");
};

// Page navigation methods
const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("fetchProducts", {
      page: props.currentPage + 1,
      itemsPerPage: props.itemsPerPage,
    });
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("fetchProducts", {
      page: props.currentPage - 1,
      itemsPerPage: props.itemsPerPage,
    });
  }
};

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    emit("fetchProducts", { page, itemsPerPage: props.itemsPerPage });
  }
};

// Handle search event
const handleSearchEvent = (event) => {
  searchInput.value = event;
  emit("search", searchInput.value);
};

// Handle delete action
const handleDelete = (id) => {
  emit("delete", id);
};
</script>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>
