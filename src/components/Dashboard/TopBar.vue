<template>
  <div class="flex justify-between items-center bg-gray-800 p-4">
    <!-- Left side (Logo or any other content) -->
    <div class="text-white text-xl font-bold">
      <span>Dashboard</span>
    </div>

    <!-- Right side (Profile Dropdown) -->
    <div class="flex items-center">
      <ProfileDropdown />
    </div>
  </div>
</template>

<script>
import ProfileDropdown from '@/components/Dashboard/ProfileDropdown.vue';

export default {
  name: 'TopBar',
  components: {
    ProfileDropdown,
  },
};
</script>

<style scoped>
/* Add your TopBar styles here */
</style>
