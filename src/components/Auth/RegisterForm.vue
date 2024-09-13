<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <!-- Name -->
      <div>
        <label for="name" class="block text-gray-700 font-medium mb-2">Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="errors.name" class="mt-2 text-red-600">{{ errors.name[0] }}</div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="errors.email" class="mt-2 text-red-600">{{ errors.email[0] }}</div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-gray-700 font-medium mb-2">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="errors.password" class="mt-2 text-red-600">{{ errors.password[0] }}</div>
      </div>

      <!-- Password Confirmation -->
      <div>
        <label for="password_confirmation" class="block text-gray-700 font-medium mb-2">Password Confirmation:</label>
        <input
          type="password"
          v-model="password_confirmation"
          id="password_confirmation"
          required
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="errors.password_confirmation" class="mt-2 text-red-600">{{ errors.password_confirmation[0] }}</div>
      </div>

      <!-- Image -->
      <div>
        <label for="image" class="block text-gray-700 font-medium mb-2">Image:</label>
        <input
          type="file"
          @change="handleImageUpload"
          id="image"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="errors.image" class="mt-2 text-red-600">{{ errors.image[0] }}</div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export default {
  name: 'RegisterForm',
  setup() {
    const authStore = useAuthStore();
    const { errors } = storeToRefs(authStore); // Ensure reactivity

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const image = ref(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      image.value = file;
    };

    const handleRegister = async () => {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('email', email.value);
      formData.append('password', password.value);
      formData.append('password_confirmation', password_confirmation.value);
      formData.append('image', image.value);

      try {
        await authStore.register(formData);
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      handleImageUpload,
      handleRegister,
      errors // Reactive errors
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS is used, so no additional styles are needed */
</style>
