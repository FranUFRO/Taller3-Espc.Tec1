<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!--En las clases existia mx-7 pero hacia que el navbar ocupara un ancho mayor al disponible asi que se elimino-->
  <nav class="flex w-full int-navbar">
      <div class="flex flex-1 items-center justify-start">
        <RouterLink to="/inicio">Inicio</RouterLink>
        <RouterLink to="/juego">Juego</RouterLink>
        <RouterLink to="/elegirPersonaje">Elegir Personaje</RouterLink>
        <RouterLink to="/records">Rercords</RouterLink>
        <RouterLink to="/login">Iniciar Sesion</RouterLink>
      </div>
  </nav>
</template>

<style scoped>
.int-navbar {
  background-color: var(--primary);
  height: 5rem;
}

.link-hover:hover {
  background-color: var(--secondary);
  color: var(--text-white);
}
</style>

