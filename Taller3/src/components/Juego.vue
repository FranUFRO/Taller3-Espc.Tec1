<template>
    <div>
        <h1>Hola desde Juego</h1>
        <h1>Hola {{ user }}</h1>
    </div>
    
</template>

<script setup>

import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/autentificar.js';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);


onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  } else {
    console.log('Usuario logueado:', authStore.user);
  }
});
</script>