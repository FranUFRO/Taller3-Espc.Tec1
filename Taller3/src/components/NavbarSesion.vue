<template>
  <nav class="navbar">
    <ul class="navbar-menu">
      <li class="navbar-item" @click="cerrarSesion"><a>Cerrar Sesión</a></li>
      <router-link to="/juego" class="navbar-item"><a> Jugar</a></router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/autentificar.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const cerrarSesion = () => {
  authStore.logout(); // Llama al método logout() de tu store de Pinia
  router.push("/inicio"); // Redirige a la página de inicio u otra página después de cerrar sesión
};
</script>

<style scoped>
.navbar {
  background-image: url('https://img.freepik.com/free-photo/grunge-vintage-paper-background-with-stains_1048-15821.jpg'); /* Color púrpura oscuro para la navbar */
  padding: 1rem;
  text-align: center;
  font-family: 'MedievalSharp', cursive; /* Fuente medieval */
  border-bottom: 2px solid #6b5913; /* Borde dorado en la parte inferior */
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.navbar-item a {
  color: var(
    --text-white
  ); /* Utiliza la variable definida para el texto blanco */
  background-color: #918f8f; /* Color gris más claro para los botones */
  padding: 0.5rem 1rem;
  text-decoration: none; /* Quita la línea de abajo */
  border: 1px solid #373737; /* Bordes alrededor de los botones */
  border-radius: 5px; /* Bordes redondeados */
  transition: background-color 0.3s ease;
}

.navbar-item a:hover {
  background-color: #e0e0e0; /* Color de fondo en hover */
}
</style>
