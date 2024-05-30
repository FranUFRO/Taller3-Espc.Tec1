<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="w-full">
    <Navbar/>
  </header>
  <RouterView />
</template>

<style>
:root {
  --background: #0D1321;
  --primary: #3E5D75;
  --secondary: #738BAB;
  --text-white: #EFF1F6;
}

header {
  background-color: var(--primary);
}
</style>