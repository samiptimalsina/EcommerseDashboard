<template>
  <div class="user-list">
    <DataTable :users="users" />
    <p v-if="users.length === 0">No users available.</p>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import DataTable from "@/components/Dashboard/users/DataTable.vue";
import { useUserStore } from "@/stores/user";

export default {
  name: "UserList",
  components: {
    DataTable,
  },
  setup() {
    const userStore = useUserStore();
    const users = ref([]);

    onMounted(async () => {
      try {
        await userStore.fetchUsers();
        users.value = userStore.users;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    });

    return {
      users,
    };
  },
};
</script>

<style scoped>
.user-list {
  margin: 20px;
}

h3 {
  margin: 40px 0 20px;
}
</style>
