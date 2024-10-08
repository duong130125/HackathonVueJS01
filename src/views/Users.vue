<template>
  <div>
    <div class="content-header">
      <h2>Manager User</h2>
      <button class="add-user-btn" @click="openAddModal">Add New User</button>
    </div>

    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or email"
        class="search-input"
      />
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Date Of Birth</th>
          <th>Email</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ formatDate(user.dateOfBirth) }}</td>
          <td>{{ user.email }}</td>
          <td class="option-buttons">
            <button class="edit-btn" @click="openEditModal(index)">Edit</button>
            <button class="delete-btn" @click="confirmDeleteUser(index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEdit ? "Edit User" : "Add New User" }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <div class="radio-group">
              <input type="radio" value="Male" v-model="formData.gender" /> Male
              <input type="radio" value="Female" v-model="formData.gender" />
              Female
              <input type="radio" value="Other" v-model="formData.gender" />
              Other
            </div>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Date Of Birth</label>
            <input type="date" v-model="formData.dateOfBirth" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div v-if="formErrors.length" class="form-errors">
            <p
              v-for="(error, index) in formErrors"
              :key="index"
              class="error-message"
            >
              {{ error }}
            </p>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="save-btn">
              {{ isEdit ? "Save" : "Add" }}
            </button>
            <button type="button" class="close-btn" @click="closeModal">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm</h3>
        <p>Are you sure you want to delete this account?</p>
        <div class="modal-buttons">
          <button class="close-btn" @click="closeDeleteModal">Cancel</button>
          <button class="delete-btn" @click="deleteUser">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";

const users = ref([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEdit = ref(false);
const currentUserIndex = ref(null);
const searchQuery = ref("");
const formErrors = ref([]);

const formData = reactive({
  name: "",
  gender: "Male",
  dateOfBirth: "",
  email: "",
});

onMounted(() => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  users.value = storedUsers;
});

const filteredUsers = computed(() => {
  if (searchQuery.value === "") {
    return users.value;
  }
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openAddModal = () => {
  resetForm();
  showModal.value = true;
  isEdit.value = false;
};

const openEditModal = (index) => {
  const user = users.value[index];
  formData.name = user.name;
  formData.gender = user.gender;
  formData.dateOfBirth = user.dateOfBirth;
  formData.email = user.email;
  currentUserIndex.value = index;
  showModal.value = true;
  isEdit.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const validateForm = () => {
  formErrors.value = [];
  const today = new Date();
  const userDOB = new Date(formData.dateOfBirth);

  if (!formData.name) formErrors.value.push("Tên là bắt buộc.");

  if (!formData.email) formErrors.value.push("Email là bắt buộc.");
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    formErrors.value.push("Định dạng email không hợp lệ.");
  else if (
    users.value.some(
      (user, index) =>
        user.email === formData.email && index !== currentUserIndex.value
    )
  )
    formErrors.value.push("Email đã tồn tại.");

  if (userDOB > today)
    formErrors.value.push("Ngày sinh không thể ở tương lai.");

  return formErrors.value.length === 0;
};

const submitForm = () => {
  if (validateForm()) {
    if (isEdit.value) {
      users.value[currentUserIndex.value] = { ...formData };
    } else {
      users.value.push({ ...formData });
    }
    localStorage.setItem("users", JSON.stringify(users.value));
    closeModal();
  }
};

const confirmDeleteUser = (index) => {
  currentUserIndex.value = index;
  showDeleteModal.value = true;
};

const deleteUser = () => {
  users.value.splice(currentUserIndex.value, 1);
  localStorage.setItem("users", JSON.stringify(users.value));
  closeDeleteModal();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  currentUserIndex.value = null;
};

const resetForm = () => {
  formData.name = "";
  formData.gender = "Male";
  formData.dateOfBirth = "";
  formData.email = "";
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
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

.search-container {
  margin-bottom: 20px;
  justify-content: end;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.option-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn,
.close-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.close-btn {
  background-color: #6c757d;
  color: white;
}

.save-btn:hover {
  background-color: #0056b3;
}

.close-btn:hover {
  background-color: #5a6268;
}
.radio-group {
  display: flex;
}
</style>
