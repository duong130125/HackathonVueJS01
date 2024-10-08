<template>
  <div>
    <div class="content-header">
      <h2>Manager Products</h2>
      <button class="add-user-btn">Add New Product</button>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DateOfBirth</th>
          <th>Email</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dateOfBirth }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const users = ref([
  {
    name: "John Doe",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    email: "john.doe@example.com",
  },
]);
</script>

<style scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-user-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.user-table th {
  background-color: #f2f2f2;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.edit-btn {
  background-color: #da8d21;
  color: white;
  border: none;
}

.delete-btn {
  background-color: #ea4335;
  color: white;
  border: none;
}
</style>
