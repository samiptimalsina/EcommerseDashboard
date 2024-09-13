<template>
  <div class="overview-container p-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold">Overview</h1>
    </header>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1: Key Metric 1 -->
      <div class="card bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Metric 1</h2>
        <p class="text-lg">{{ metric1Value }}</p>
      </div>
      
      <!-- Card 2: Key Metric 2 -->
      <div class="card bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Metric 2</h2>
        <p class="text-lg">{{ metric2Value }}</p>
      </div>

      <!-- Card 3: Key Metric 3 -->
      <div class="card bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Metric 3</h2>
        <p class="text-lg">{{ metric3Value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard-overview',
  data() {
    return {
      metric1Value: 'Value 1', // Replace with actual data or computed values
      metric2Value: 'Value 2',
      metric3Value: 'Value 3'
    };
  },
  mounted() {
    // You can fetch data or perform actions when the component is mounted
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
.overview-container {
  max-width: 1200px;
  margin: 0 auto;
}
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
</style>
