<template>
  <div class="elegir-container background">
    <header>
      <Navbar />
    </header>
    <div class="content">
      <h1 class="tituloxd">Elija un personaje para usted y un jugador invitado</h1>
      <p></p>
      <div class="row">
        <div class="col-md-6">
          <div class="personajeContainer">
            <h1>Jugador {{ user }}</h1>
            <button @click="mostrarImagenAnterior">Atrás</button>
            <img v-if="imagen" :src="imagen" alt="Imagen" ref="carouselImage" class="sprite" />
            <button @click="mostrarSiguienteImagen">Siguiente</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="personajeContainer">
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
      <div class="drag-drop-section">
      <h2 class="section-title">Selecciona tu Escenario</h2>
      <div class="drag-container">
        <div class="imgxd draggable" draggable="true" data-id="1">
          <img src="https://i.pinimg.com/originals/36/09/a5/3609a58f09f1c9c87fea4cf875b564b7.gif" alt="">
        </div>
        <div class="imgxd draggable" draggable="true" data-id="2">
          <img src="https://cdna.artstation.com/p/assets/images/images/025/965/386/original/lennart-butz-idea5anim4.gif?1587480606" alt="">
        </div>
        <div class="imgxd draggable" draggable="true" data-id="3">
          <img src="https://cdna.artstation.com/p/assets/images/images/015/690/214/original/daniel-gianino-fairy-forest1.gif?1549276717" alt="">
        </div>
        <div class="imgxd draggable" draggable="true" data-id="4">
          <img src="https://i.pinimg.com/originals/f5/bb/fa/f5bbfaf72ab0587d6408748418d948bb.gif" alt="">
        </div>
      </div>
      <div class="drop-container" @drop="handleDrop" @dragover.prevent>
        <img class="scenarioSelected" v-if="scenarioStore.background" :src="useScenarioStore().background"/>
        <p v-if="!scenarioStore.background">Arrastra el escenario aquí</p>
      </div>
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
const scenarioStore = useScenarioStore();

import { ref } from "vue";
import { useScenarioStore } from '../stores/scenarioStore';

import image1 from "../assets/gif/Golem/GolemWalk.gif";
import image2 from "../assets/gif/Mago/MagoWalk.gif";

const imagenes = [image1, image2];
let indiceImagen = ref(0);
let imagen = ref(imagenes[indiceImagen.value]);
const carouselImage = ref(null);

const mostrarSiguienteImagen = () => {
  indiceImagen.value = (indiceImagen.value + 1) % imagenes.length;
  imagen.value = imagenes[indiceImagen.value];
};

const mostrarImagenAnterior = () => {
  indiceImagen.value = (indiceImagen.value - 1 + imagenes.length) % imagenes.length;
  imagen.value = imagenes[indiceImagen.value];
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
};

const mostrarImagenAnterior2 = () => {
  indiceImagen2.value = (indiceImagen2.value - 1 + imagenes2.length) % imagenes2.length;
  imagen2.value = imagenes2[indiceImagen2.value];
};

const guardarPersonajes = () => {
  localStorage.setItem('indiceImagen1', indiceImagen.value);
  localStorage.setItem('indiceImagen2', indiceImagen2.value);
  router.push('/juego');
};

const handleDrop = (event) => {
  const scenarioId = event.dataTransfer.getData('text/plain');
  scenarioStore.setSelectedScenario(scenarioId);
};

const handleDragStart = (event) => {
  const target = event.target.closest('.draggable');
  event.dataTransfer.setData('text/plain', target.dataset.id);
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }
  
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
  });
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
button {
  background-color: #4a235a; 
  color: white; 
  border: none; 
  padding: 10px 20px; 
  font-size: 1.2rem; 
  font-family: 'MedievalSharp', cursive; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
  margin-top: 10px; 
}

button:hover {
  background-color: #6c3483; 
}
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

.personajeContainer {
  background-color: rgba(51, 51, 51, 0.5);
  padding: 20px;
  border: 2px solid #f4d03f;
  border-radius: 10px;
  margin-top: 20px;
}
.content {
  margin-top: 100px;
}

h1 {
  color: white;
}

.tituloxd{
  font-family: 'MedievalSharp', cursive;
  color: yellow;
  background-color: rgba(51, 51, 51, 0.5);
  margin-top: 20px;
  padding: 20px;
  border: 2px dashed #f4d03f;
  border-radius: 10px;


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

.background {
  width: 100%;
  height: 300vh;
  background-image: url('../src/imagenesinicio/2d-brick-gray-wall-texture-600nw-2127747113.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 50px;
}

.drag-drop-section {
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #4a235a;
  border-radius: 10px;
  text-align: center;
  margin-top: auto;
}

.drag-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.drop-container {
  margin-top: 20px;
  padding: 20px;
  border: 2px dashed #f4d03f;
  border-radius: 10px;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.5);
  color: white;
  font-family: 'MedievalSharp', cursive;
  font-size: 1.2rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #f4d03f;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'MedievalSharp', cursive;
  text-shadow: 2px 2px 4px #000;
}

.imgxd img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border: 2px solid black;
  transition: transform 0.3s ease;
  
}

.imgxd img:hover {
  transform: scale(1.1);
}

.scenarioSelected {
  width: 1000px;
  height: 500px;
}

.content{
  font-family: 'MedievalSharp', cursive;
  color: yellow;
}
</style>
