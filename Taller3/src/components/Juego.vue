<template>
  <div class="game-container background">
    <header>
      <Navbar/>
      <h1> Usuario: {{ user }}</h1>
    </header>
    <div class="content">
      <h1>Usuario: {{ user }}</h1>
      <div class="arena" v-if="authStore.isAuthenticated" :style="{ backgroundImage: `url('${scenarioBackground}')` }">
        <div class="player" v-for="(player, index) in players" :key="index" :style="getPlayerStyle(player)">
          <h2 class="player-name" style="background-color: white;">{{ player.name }}</h2>
          <div class="health-bar">
            <div class="health" :style="{ width: player.health + '%' }"></div>
          </div>
          <img :src="player.sprite" alt="player sprite" class="sprite" />
        </div>
      </div>
      <div class="ranking">
        <h2>Ranking</h2>
        <ul>
          <li v-for="(player, index) in sortedPlayers" :key="index">
            {{ player.name }}: {{ player.points }} puntos
          </li>
          <button @click="generatePDF">Obtener Registro en PDF</button>
        </ul>
      </div>
    </div>
    <button v-if="gameOver" @click="resetGame">Volver a jugar</button>
    <button v-if="gameOver" @click="volverElegirPersonaje">Elegir Personajes</button>
  </div>
</template>

<script setup>
import Navbar from '../components/NavbarSesion.vue'
import { onMounted, computed, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/autentificar.js';
import axios from 'axios';


const scenarioBackground = useScenarioStore().background;

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

import image1 from "../assets/gif/Golem/GolemWalk.gif";
import image2 from "../assets/gif/Mago/MagoRun.gif";
import image3 from "../assets/gif/Samurai/SamuraiRun.gif";
import image4 from "../assets/gif/Skeleton/SkeletonRun.gif";
import image5 from '../assets/gif/Golem/GolemAtack.gif';
import image6 from '../assets/gif/Mago/MagoAtack.gif';
import image7 from '../assets/gif/Samurai/SamuraiAtack.gif';
import image8 from '../assets/gif/Skeleton/SkeletonAtack.gif';
import image9 from '../assets/gif/Golem/GolemDead.gif';
import image10 from '../assets/gif/Mago/MagoDead.gif';
import image11 from '../assets/gif/Samurai/SamuraiDead.gif';
import image12 from '../assets/gif/Skeleton/SkeletonDead.gif';

const imagenes = [image1, image2];
const imagenes2 = [image3, image4];

const imagenesAtaque1=[image5, image6];
const imagenesAtaque2=[image7,image8];

const imgMuerte1=[image9, image10];
const imgMuerte2=[image11,image12];

const indiceImagen1 = localStorage.getItem('indiceImagen1');
const indiceImagen2 = localStorage.getItem('indiceImagen2');

const gameOver = ref(false);
const userId = ref(null);

const obtenerUserId = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/obtener-id-user/${authStore.user}`);
     console.log(response.data.userId);
     userId.value = response.data.userId;
     console.log("userId.value: ", userId.value);
  } catch (error) {
    console.error('Error obtaining user ID:', error);
  }
};

const obtenerStats = async () => {
 
  if (userId.value) {
    await obtenerUserId();
  }
  
  if (userId.value) {
    try {
      const response = await axios.get(`http://localhost:3000/obtener-stats/${userId.value}`);
      console.log('User stats:', response.data);
      // Here you can update your component's state with the received stats
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  } else {
    console.error('User ID not found');
  }
};

const actualizarStats = async () => {
  if (!userId.value) {
    await obtenerUserId();
  }

  if (userId.value) {
    const winner = players.value[0].health > 0 ? 0 : 1;
    const stats = {
      wins: winner === 0 ? 1 : 0,
      losses: winner === 1 ? 1 : 0,
      totalGames: 1
    };

    try {
      // Primero, obtenemos los stats actuales del usuario
      const responseGet = await axios.get(`http://localhost:3000/obtener-stats/${userId.value}`);
      const currentStats = responseGet.data;

      // Actualizamos los stats
      const updatedStats = {
        wins: currentStats.wins + stats.wins,
        losses: currentStats.losses + stats.losses,
        totalGames: currentStats.wins + stats.wins+ currentStats.losses + stats.losses,
      };

      // Enviamos los stats actualizados al servidor
      const responsePost = await axios.post(`http://localhost:3000/actualizar-stats/${userId.value}`, updatedStats);
      console.log('Stats updated:', responsePost.data);
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  } else {
    console.error('User ID not found');
  }
};


// Datos de los jugadores
const players = ref([
  { name: user, health: 100, sprite: imagenes[indiceImagen1], skillCooldown: 0, x: 50, y: 100, points: 0 },
  { name: 'Jugador 2', health: 100, sprite: imagenes2[indiceImagen2], skillCooldown: 0, x: 650, y: 100, points: 0 }
]);

const speed = 10;
const arenaWidth = 800;
const arenaHeight = 600;
const hitboxSize = 50; // Tamaño de la hitbox de los jugadores

let atacanado = false;

import ataqueSonido from '../assets/sonidos/efectoAtaque.mp3';

const attack = (index) => {
  if (!atacanado) { // si atacando es verdadero significa que aun esta el gif del ataque anterior
    const target = (index + 1) % 2;
    if (isInRange(players.value[index], players.value[target])) {
      atacanado = true; 
      players.value[target].health -= 10;
      if (index === 0) {
        players.value[index].sprite = imagenesAtaque1[indiceImagen1];
      } else {
        players.value[index].sprite = imagenesAtaque2[indiceImagen2];
      }

      const audio = new Audio(ataqueSonido);
      audio.play();

      setTimeout(() => {
        if (index === 0) {
          players.value[index].sprite = imagenes[indiceImagen1];
        } else {
          players.value[index].sprite = imagenes2[indiceImagen2];
        }
        atacanado = false; 
      }, 1000);
      checkHealth();
    }
  }
};

// Función de habilidad
const useSkill = (index) => {
  const target = (index + 1) % 2;
  if (isInRange(players.value[index], players.value[target])) {
    players.value[target].health -= 20;
    players.value[index].skillCooldown = 5;
    playSound('skill');
    checkHealth();
  }
};

// Verificar si la habilidad se puede usar
const canUseSkill = (player) => {
  return player.skillCooldown === 0;
};

// Chequear la salud de los jugadores
const checkHealth = async () => {
  players.value.forEach(async(player, index) => {
    if (player.health <= 0) {
      player.health = 0;
      playSound('death');
      alert(`${player.name} ha perdido`);
      if (index === 0) {
      players.value[index].sprite = imgMuerte1[indiceImagen1];
    } else {
      players.value[index].sprite = imgMuerte2[indiceImagen2];
    }

    setTimeout(() => {
        if (index === 0) {
          players.value[index].sprite = imagenes[indiceImagen1];
        } else {
          players.value[index].sprite = imagenes2[indiceImagen2];
        } 
      }, 5000);
      players.value[(index + 1) % 2].points++;
      gameOver.value = true;
      await actualizarStats();
      await obtenerStats();
    }
  });
};

// Reducir cooldown cada segundo
setInterval(() => {
  players.value.forEach(player => {
    if (player.skillCooldown > 0) {
      player.skillCooldown--;
    }
  });
}, 1000);

// Función para reproducir sonidos
const playSound = (effect) => {
  const sounds = {
    attack: '../assets/sonidos/efectoAtaque.mp3',
    skill: 'path/to/skill-sound.mp3',
    death: 'path/to/death-sound.mp3'
  };
  new Audio(sounds[effect]).play();
};

// Movimiento de jugadores
const movePlayer = (player, dx, dy) => {
  player.x = Math.max(0, Math.min(arenaWidth - hitboxSize, player.x + dx));
  player.y = Math.max(0, Math.min(arenaHeight - hitboxSize, player.y + dy));
};

// Verificar si los jugadores están dentro de la hitbox
const isInRange = (attacker, target) => {
  const distanceX = Math.abs(attacker.x - target.x);
  const distanceY = Math.abs(attacker.y - target.y);
  return distanceX < hitboxSize && distanceY < hitboxSize;
};

// Estilo de posición del jugador
const getPlayerStyle = (player) => {
  return {
    left: player.x + 'px',
    top: player.y + 'px'
  };
};

// Manejar eventos de teclado
const handleKeydown = (event) => {
  switch (event.key) {
    case 'w': movePlayer(players.value[0], 0, -speed); break;
    case 'a': movePlayer(players.value[0], -speed, 0); break;
    case 's': movePlayer(players.value[0], 0, speed); break;
    case 'd': movePlayer(players.value[0], speed, 0); break;
    case 'x': attack(0); break;
    case 'ArrowUp': movePlayer(players.value[1], 0, -speed); break;
    case 'ArrowLeft': movePlayer(players.value[1], -speed, 0); break;
    case 'ArrowDown': movePlayer(players.value[1], 0, speed); break;
    case 'ArrowRight': movePlayer(players.value[1], speed, 0); break;
    case 'm': attack(1); break;
  }
};

// Ordenar jugadores por puntos
const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => b.points - a.points);
});

// Reiniciar el juego
const resetGame = () => {
  players.value.forEach(player => {
    player.health = 100;
    player.x = player.name === 'Jugador 1' ? 50 : 750;
    player.y = 100;
  });

  players[0].sprite= imagenes[indiceImagen1];
  players[1].sprite=imagenes2[indiceImagen2];

  gameOver.value = false;
};

const volverElegirPersonaje= ()=>{
  router.push('/elegirPersonaje');
}

onMounted(async () => {
  await obtenerUserId();
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  if (!authStore.isAuthenticated) {
    router.push('/login');
  } else {
    console.log('Usuario logueado:', authStore.user);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useScenarioStore } from '@/stores/scenarioStore';

const generatePDF = async () => {
  if (!userId.value) {
    await obtenerUserId();
  }

  if (userId.value) {
    try {
      
      const response = await axios.get(`http://localhost:3000/obtener-stats/${userId.value}`);
      const stats = response.data;

      
      const doc = new jsPDF();

      
      doc.setFontSize(22);
      doc.setTextColor(0, 102, 204);
      doc.text('Registro Histórico de Partidas', 105, 20, null, null, 'center');

     
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Nombre Jugador: ${authStore.user}`, 20, 40);

      
      const fecha = new Date().toLocaleDateString();
      doc.setFontSize(12);
      doc.text(`Fecha: ${fecha}`, 20, 50);

     
      const tableColumn = ["Estadística", "Valor"];
      const tableRows = [
        ["Juegos Totales", stats.total_games],
        ["Juegos Ganados", stats.wins],
        ["Juegos Perdidos", stats.losses],
      ];

      doc.autoTable({
        startY: 60,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

     
      const winPercentage = (stats.wins / stats.total_games * 100).toFixed(2);
      doc.setFontSize(14);
      doc.text(`Porcentaje de Victorias: ${winPercentage}%`, 20, doc.lastAutoTable.finalY + 20);

     
      const pdfName = `registro_partidas_${authStore.user}_${fecha.replace(/\//g, '-')}.pdf`;
      doc.save(pdfName);

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  } else {
    console.error('User ID not found');
  }
};

</script>

<style scoped>
.sprite {
  width: 150px;
  height: 200px;
  margin-bottom: 10px;
}

h1{
  color:white;
}
.game-container {
  text-align: center;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.arena {
  position: relative;
  width: 1000px;
  height: 500px;
  border: 2px solid black;
  background-size: cover;
}

.player {
  position: absolute;
  text-align: center;
}

.player-name {
  font-size: 12px;
}

.health-bar {
  width: 100%;
  background-color: #e0e0e0;
  border: 1px solid #000;
  margin-bottom: 10px;
}

.health {
  height: 20px;
  background-color: #76c7c0;
}

.ranking {
  width: 200px;
  margin-left: 20px;
  background-color: white;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
}

.ranking h2 {
  font-size: 24px;
}

.ranking ul {
  list-style-type: none;
  padding: 0;
}

.ranking li {
  font-size: 18px;
  margin-bottom: 10px;
}


</style>
