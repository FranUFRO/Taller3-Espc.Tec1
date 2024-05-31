<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="background">
    <header class="w-full align-top">
      <Navbar/> 
      <router-view />
    </header>
  </div>
 
  
    
  
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
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  color: white;
  padding: 1rem;
  z-index: 1000;
}

.background {
  margin-left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  background-image: url('../src/imagenesinicio/2d-brick-gray-wall-texture-600nw-2127747113.webp');
  background-size: cover;
  background-repeat: repeat;
  background-position: top left;
}



</style>