<template>
  <div class="elegir-container background">
    <header>
      <Navbar />
    </header>
    <div class="content">
      <h1>Eliga un personaje para usted y un jugador invitado </h1>
      <p></p>
      <div class="row">
        <div class="col-md-6">
          <div>
            <h1>Jugador {{ user }}</h1>
            <button @click="mostrarImagenAnterior">Atrás</button>
            <img v-if="imagen" :src="imagen" alt="Imagen" ref="carouselImage" class="sprite" />
            <button @click="mostrarSiguienteImagen">Siguiente</button>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <h1>Jugador Invitado</h1>
            <button @click="mostrarImagenAnterior2">Atrás</button>
            <img v-if="imagen2" :src="imagen2" alt="Imagen2" ref="carouselImage2" class="sprite"/>
            <button @click="mostrarSiguienteImagen2">Siguiente</button>
          </div>
        </div>
      </div>
      <div>
        <button @click="guardarPersonajes">Elegir Personajes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/NavbarSesion.vue";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/autentificar.js";

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = authStore.isAuthenticated;

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  } else {
    console.log("Usuario logueado:", authStore.user);
  }
});
import { ref } from "vue";

import image1 from "../assets/gif/Golem/GolemWalk.gif";
import image2 from "../assets/gif/Mago/MagoWalk.gif";

const imagenes = [image1, image2];
let indiceImagen = ref(0);
let imagen = ref(imagenes[indiceImagen.value]);
const carouselImage = ref(null);

const mostrarSiguienteImagen = () => {
  indiceImagen.value = (indiceImagen.value + 1) % imagenes.length;
  imagen.value = imagenes[indiceImagen.value];
  console.log(carouselImage.value);
};

const mostrarImagenAnterior = () => {
  indiceImagen.value = (indiceImagen.value - 1 + imagenes.length) % imagenes.length;
  imagen.value = imagenes[indiceImagen.value];
  console.log(carouselImage.value);
};

import image3 from "../assets/gif/Samurai/SamuraiWalk.gif";
import image4 from "../assets/gif/Skeleton/SkeletonWalk.gif";

const imagenes2 = [image3, image4];
let indiceImagen2 = ref(0);
let imagen2 = ref(imagenes2[indiceImagen2.value]);
const carouselImage2 = ref(null);

const mostrarSiguienteImagen2 = () => {
  indiceImagen2.value = (indiceImagen2.value + 1 ) % imagenes2.length;
  imagen2.value = imagenes2[indiceImagen2.value];
  console.log(carouselImage2.value);
};

const mostrarImagenAnterior2 = () => {
  indiceImagen2.value = (indiceImagen2.value - 1+ imagenes2.length) % imagenes2.length;
  imagen2.value = imagenes2[indiceImagen2.value];
  console.log(carouselImage2.value);
};

const guardarPersonajes= ()=>{
  console.log("En guardarPersonajes")
  console.log(imagen.value , "indice: " , indiceImagen.value)
  console.log(imagen2.value, "indice: ", indiceImagen2.value)
  localStorage.setItem('indiceImagen1', indiceImagen.value);
  localStorage.setItem('indiceImagen2', indiceImagen2.value);
  router.push('/juego');

}
</script>

<style scoped>
.item {
  background-color: #ccc;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.elegir-container {
  text-align: center;
}

.content {
  margin-top: 100px;
}

h1 {
  color: white;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.carousel {
  position: relative;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  flex: 0 0 auto;
  width: 100%;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
}

.prev-button:hover,
.next-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.sprite {
  width: 400px;
  height: 450px;
}
</style>
