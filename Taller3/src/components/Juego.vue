<template>
  <div class="game-container background">
    <h1>Hola desde Juego</h1>
    <h1>Hola {{ user }}</h1>
    <div class="content">
      <div class="arena" v-if="authStore.isAuthenticated">
        <div class="player" v-for="(player, index) in players" :key="index" :style="getPlayerStyle(player)">
          <h2 class="player-name">{{ player.name }}</h2>
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
        </ul>
      </div>
    </div>
    <button v-if="gameOver" @click="resetGame">Volver a jugar</button>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/autentificar.js';

const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const gameOver = ref(false);

// Datos de los jugadores
const players = ref([
  { name: 'Jugador 1', health: 100, sprite: 'path/to/sprite1.png', skillCooldown: 0, x: 50, y: 100, points: 0 },
  { name: 'Jugador 2', health: 100, sprite: 'path/to/sprite2.png', skillCooldown: 0, x: 750, y: 100, points: 0 }
]);

const speed = 10;
const arenaWidth = 800;
const arenaHeight = 600;
const hitboxSize = 50; // Tamaño de la hitbox de los jugadores

// Función de ataque
const attack = (index) => {
  const target = (index + 1) % 2;
  if (isInRange(players.value[index], players.value[target])) {
    players.value[target].health -= 10;
    playSound('attack');
    checkHealth();
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
const checkHealth = () => {
  players.value.forEach((player, index) => {
    if (player.health <= 0) {
      player.health = 0;
      playSound('death');
      alert(`${player.name} ha perdido`);
      players.value[(index + 1) % 2].points++;
      gameOver.value = true;
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
    attack: 'path/to/attack-sound.mp3',
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
  gameOver.value = false;
};

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
</script>

<style scoped>
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
  width: 800px;
  height: 600px;
  border: 2px solid black;
  background: url('https://i.pinimg.com/originals/36/09/a5/3609a58f09f1c9c87fea4cf875b564b7.gif') no-repeat center center;
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

.sprite {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
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
