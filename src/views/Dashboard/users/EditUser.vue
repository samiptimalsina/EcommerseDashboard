<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
const user = ref({
  name: "",
  email: "",
  image: "",
});
const imageFile = ref(null);

onMounted(async () => {
  if (id) {
    try {
      await userStore.fetchUserById(id);
      user.value = { ...userStore.users[0] };
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to fetch user data.");
    }
  } else {
    console.error("No id found in route parameters");
    alert("No user ID provided.");
  }
});

const updateUser = async () => {
  try {
    const formData = new FormData();
    formData.append("name", user.value.name);
    formData.append("email", user.value.email);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    await userStore.updateUserById(id, formData);
    alert("User updated successfully.");
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user.");
  }
};

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Edit User</h1>

    <form @submit.prevent="updateUser">
      <!-- Name -->
      <div class="mb-5">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="user.name"
          class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-5">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          required
        />
      </div>

      <!-- Profile Image -->
      <div class="mb-5">
        <label for="image" class="block text-sm font-medium text-gray-700 mb-1"
          >Profile Image</label
        >
        <input
          type="file"
          id="image"
          @change="onImageChange"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <img
          v-if="user.image"
          :src="user.image"
          alt="User Image"
          class="mt-2 w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 text-white font-semibold rounded-lg text-base px-6 py-3 transition duration-150 ease-in-out"
      >
        Update User
      </button>
    </form>
  </div>
</template>
