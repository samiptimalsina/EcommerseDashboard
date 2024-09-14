<template>
  <nav v-show="isOpen" class="mt-12 space-y-4">
    <router-link
      v-for="(item, index) in navItems"
      :key="index"
      :to="item.path"
      class="block p-2 rounded hover:bg-gray-700"
    >
      <ul class="list-none">
        <li class="flex mr-2 pl-4 items-center">
          <component :is="item.icon" class="w-6 h-6 mr-2 mr-2" />
          <span class="ml-4"> {{ item.text }} </span>
        </li>
      </ul>
    </router-link>
  </nav>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  navItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
/* Add additional styles if needed */
</style>
