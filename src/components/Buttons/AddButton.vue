<template>
  <router-link :to="link">
    <button
      class="text-white bg-green-700 hover:bg-green-800 flex focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      <PlusIcon class="w-5 h-5" />
      <span>{{ buttonText }}</span>
    </button>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline"; // Import the PlusIcon from Heroicons

defineProps({
  link: {
    type: Object,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});
</script>
