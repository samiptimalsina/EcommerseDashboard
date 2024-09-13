<!-- src/layouts/DashboardLayout.vue -->
<template>
  <div>
    <TopBar />
    <main>
      <router-view></router-view> <!-- This will render the component based on the route -->
    </main>
    <footer> <!-- Your dashboard footer here --> </footer>
  </div>
</template>

<script>
import TopBar from '@/components/Dashboard/TopBar.vue';

export default {
  name: 'DashboardLayout',
  components: {
    TopBar,
  },
};
</script>

<style scoped>
/* Add your dashboard layout styles here */
</style>
