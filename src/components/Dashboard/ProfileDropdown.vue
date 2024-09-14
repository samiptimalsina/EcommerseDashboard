<template>
  <div class="relative">
    <!-- Profile Image -->
    <!-- Replace with actual profile image source -->
    <img
      @click="toggleDropdown"
      :src="
        authStore.auth_user && authStore.auth_user.image
          ? authStore.auth_user.image
          : 'https://via.placeholder.com/40'
      "
      alt="Profile"
      class="w-10 h-10 rounded-full cursor-pointer"
    />

    <!-- Dropdown Menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
    >
      <ul>
        <li>
          <button
            @click="logout"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  authStore.logOut();
};
onMounted(async () => {
  await authStore.authUser();
});
</script>
