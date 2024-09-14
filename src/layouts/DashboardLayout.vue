<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <SideBar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- TopBar -->
      <TopBar />

      <!-- Main content -->
      <main class="flex-1 bg-gray-100 p-6">
        <router-view></router-view>
        <!-- This will render the component based on the route -->
      </main>

      <!-- Footer -->
      <footer class="bg-gray-800 text-white p-4">
        <!-- Your dashboard footer here -->
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import TopBar from "@/components/Dashboard/TopBar.vue";
import SideBar from "@/components/Dashboard/SideBar.vue";
</script>

<style scoped>
/* Add your dashboard layout styles here */

/* Ensure the sidebar has a fixed width and the main content takes the rest of the space */
.SideBar {
  width: 250px; /* Adjust as needed */
}
main {
  flex: 1;
}
</style>
