<template>
  <header class="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 flex items-center justify-between shadow-lg">
    <div class="flex items-center space-x-4">
      <img src="@/assets/logo.png" alt="Logo" class="h-12 w-auto rounded-full shadow-lg" />
      <h1 class="text-3xl font-extrabold tracking-wide">My Application</h1>
    </div>
    <nav>
      <ul class="flex space-x-8">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/register" class="nav-link">Register</router-link></li>
        <!-- Add more links here if needed -->
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
/* Styling for the navigation header */
header {
  background: linear-gradient(90deg, #1f2937 0%, #0f172a 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

header img {
  filter: brightness(0) invert(1); /* Make logo white if it's dark */
}

nav ul {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fbbf24;
  text-decoration: underline;
}
</style>
