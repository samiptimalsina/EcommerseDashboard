<template>
  <router-link
    :to="link"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Edit
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";

// Define the props for the component
defineProps({
  link: {
    type: Object,
    required: true,
  },
});
</script>
