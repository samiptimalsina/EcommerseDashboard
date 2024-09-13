<template>
  <footer class="bg-gray-800 text-white p-4 text-center">
    <div class="container mx-auto">
      <p>&copy; 2024 My Application. All rights reserved.</p>
      <div class="flex justify-center space-x-4 mt-2">
        <a href="https://facebook.com" class="text-white hover:text-blue-500">Facebook</a>
        <a href="https://twitter.com" class="text-white hover:text-blue-400">Twitter</a>
        <a href="https://instagram.com" class="text-white hover:text-pink-500">Instagram</a>
      </div>
      <div class="mt-4">
        <p>Subscribe to our newsletter:</p>
        <form @submit.prevent="subscribe">
          <input type="email" v-model="email" placeholder="Your email" class="p-2 rounded" required />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded ml-2">Subscribe</button>
        </form>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    subscribe() {
      // Handle subscription logic here
      alert(`Subscribed with email: ${this.email}`);
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #333;
}
</style>
