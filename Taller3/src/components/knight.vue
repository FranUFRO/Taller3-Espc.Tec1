<template>
    
    <div class="container">
      <div>
        
        <div class="sprite knight-animation"></div>
      </div>
    </div>  
      
</template>

<script setup>
// No se requiere script adicional para este ejemplo.
</script>

<style scoped>
.background {
  /* Estilos para el fondo si son necesarios */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.sprite {
  width: 64px; /* Ajusta el ancho del frame del sprite */
  height: 64px; /* Ajusta la altura del frame del sprite */
  background-image: url('../imagenesinicio/kIdle.png'); /* Ruta a la imagen del sprite */
  background-repeat: no-repeat;
  background-size: cover;
  background-color: red;
}

@keyframes knight-animation {
  0% { background-position: 0 0; }
  16.66% { background-position: -64px 0; }
  33.33% { background-position: -128px 0; }
  50% { background-position: -192px 0; }
  66.66% { background-position: -256px 0; }
  83.33% { background-position: -320px 0; }
  100% { background-position: 0 0; }
}

.knight-animation {
  animation: knight-animation 3s steps(6) infinite;
}
</style>
3