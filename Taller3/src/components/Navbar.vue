<template>
  <nav class="navbar">
    <ul class="navbar-menu">
      <router-link to="/login" class="navbar-item"><a>Iniciar sesión</a></router-link>
      <router-link to="/inicio" class="navbar-item"><a>Inicio</a></router-link>
      <router-link to="/register" class="navbar-item"><a>Registrar</a></router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.navbar {
  background-image: url('https://img.freepik.com/free-photo/grunge-vintage-paper-background-with-stains_1048-15821.jpg'); /* Color púrpura oscuro para la navbar */
  padding: 1rem;
  text-align: center;
  font-family: 'MedievalSharp', cursive; 
  border-bottom: 2px solid #6b5913; 
}

.navbar-menu {
  list-style: none;
  display: flex;
  justify-content: center; 
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.navbar-item a {
  text-decoration: none;
  color: #e4bd20; 
  background-color: #2c2c2c; 
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 2px solid #1f0629; 
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease; 
}

.navbar-item a:hover {
  background-color: #a1a32b;
  color: #fafafa; 
}
</style>
