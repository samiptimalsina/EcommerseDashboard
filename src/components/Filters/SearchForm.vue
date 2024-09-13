<script setup>
// import { defineEmits } from "vue";
const emit = defineEmits(["search"]);

const search = (e) => {
  emit("search", e.target.value);
};
</script>

<template>
  <div class="relative w-56">
    <input
      type="text"
      @input="search"
      class="block mb-4 w-full p-4 text-sm border border-gray-300 rounded-lg"
      placeholder="Search"
    />
  </div>
</template>
