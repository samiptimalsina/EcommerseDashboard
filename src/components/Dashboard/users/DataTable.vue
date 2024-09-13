<template>
  <div>
    <div class="d-flex mx-0">
      <SearchFilter @search="handleSearch" />
    </div>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <img
              :src="user.image"
              alt="User Image"
              class="w-12 h-12 rounded-full object-cover"
            />
          </td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td>{{ formatDate(user.updated_at) }}</td>
          <td>
            <router-link
              :to="{ name: 'EditUser', params: { id: user.id } }"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </router-link>
            <button
              type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No data available</p>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { computed, ref } from "vue";
import SearchFilter from "@/components/Filters/SearchForm.vue";

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const searchTerm = ref("");

const handleSearch = (term) => {
  searchTerm.value = term;
};

const filteredUsers = computed(() => {
  return props.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function formatDate(dateString) {
  return format(new Date(dateString), "MMM dd, YYY HH:mm:ss");
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

thead {
  background-color: #f4f4f4;
}
</style>
