<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center mb-3 flex">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          @click="changePage(currentPage - 1)"
          class="page-link"
          :disabled="currentPage === 1"
        >
          &laquo; Previous
        </button>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <button @click="changePage(page)" class="page-link">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          @click="changePage(currentPage + 1)"
          class="page-link"
          :disabled="currentPage === totalPages"
        >
          Next &raquo;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
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

const emit = defineEmits(["page-changed"]);

// Calculate total pages using a computed property
const totalPages = computed(() => {
  return Math.ceil(props.totalProducts / props.itemsPerPage);
});

// Change page function
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    emit("page-changed", page);
  }
};
</script>

<style scoped>
.pagination {
  justify-content: center;
  margin: 20px 0; /* Add margin for spacing */
}

.page-item {
  margin: 0 5px; /* Add space between buttons */
}

.page-link {
  border: 1px solid #007bff; /* Bootstrap primary color */
  border-radius: 0.25rem; /* Slightly rounded corners */
  padding: 10px 15px; /* Increase padding for a better click area */
  color: #007bff; /* Bootstrap primary color */
  background-color: white; /* White background */
  transition: background-color 0.2s, color 0.2s; /* Smooth transition */
}

.page-link:hover {
  background-color: #007bff; /* Change background on hover */
  color: white; /* Change text color on hover */
}

.page-item.disabled .page-link {
  color: #6c757d; /* Bootstrap secondary color for disabled */
  pointer-events: none; /* Disable click for disabled button */
}

.page-item.active .page-link {
  background-color: #007bff; /* Active page color */
  color: white; /* Active text color */
}
</style>
