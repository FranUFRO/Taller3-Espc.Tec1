<template>
  <nav class="navbar">
    <ul class="navbar-menu">
      <router-link to="/login" class="navbar-item"><a>Iniciar sesion</a></router-link>
      <router-link to="/inicio" class="navbar-item"><a>Inicio</a></router-link>      
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  background-color: #393939; /* Color gris para la navbar */
  padding: 1rem;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.navbar-item a {
  color: var(--text-white); /* Utiliza la variable definida para el texto blanco */
  background-color: #918f8f; /* Color gris más claro para los botones */
  padding: 0.5rem 1rem;
  text-decoration: none; /* Quita la línea de abajo */
  border: 1px solid #373737; /* Bordes alrededor de los botones */
  border-radius: 5px; /* Bordes redondeados */
  transition: background-color 0.3s ease;
  
}

.navbar-item a:hover {
  background-color: #E0E0E0; /* Color de fondo en hover */
}
</style>
