<template>
  <div class="sidebar">
    <router-link to="/admin" class="menu-item" active-class="active"
      >Dashboard</router-link
    >
    <router-link
      to="/admin/manager-user"
      class="menu-item"
      active-class="active"
      >Manager User</router-link
    >
    <router-link
      to="/admin/manager-product"
      class="menu-item"
      active-class="active"
      >Manager Product</router-link
    >
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: white;
  padding: 20px;
  overflow-y: auto;
}

.menu-item {
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
}

.menu-item.active {
  background-color: #9a6161;
}
</style>
