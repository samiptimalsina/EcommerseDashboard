<template>
  <div
    :class="[
      'bg-gray-800 text-white h-full transition-transform duration-300',
      isOpen ? 'w-64' : 'w-16',
    ]"
    class="relative"
  >
    <!-- Toggle button -->
    <button
      @click="toggleSidebar"
      class="absolute top-4 right-4 text-white focus:outline-none"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg
        v-if="isOpen"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Menu Items -->
    <SidebarNav :isOpen="isOpen" :navItems="navItems" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarNav from "@/components/Nav/SidebarNav.vue";
import {
  HomeIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const isOpen = ref(true);

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

const navItems = [
  { path: "/dashboard/overview", text: "Dashboard", icon: HomeIcon },
  { path: "/dashboard/users", text: "Users", icon: UsersIcon },
  { path: "/messages", text: "Messages", icon: ChatBubbleLeftIcon },
  { path: "/dashboard/products", text: "Products", icon: ShoppingCartIcon },
  { path: "/logout", text: "Logout", icon: ArrowRightOnRectangleIcon },
];
</script>

<style scoped>
/* Add additional styles if needed */
</style>
