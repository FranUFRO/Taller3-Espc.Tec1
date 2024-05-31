<template>
    <h1>Hola desde Elegir Personaje</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/autentificar.js';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  } else {
    console.log('Usuario logueado:', authStore.user);
  }
});
</script>