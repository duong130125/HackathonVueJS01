// src/App.vue
<template>
  <div class="app-container">
    <Header></Header>
    <div class="main-container">
      <Sidebar></Sidebar>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped>
.app-container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
