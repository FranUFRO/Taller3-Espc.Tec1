<template>
    <body>
    <div class="background">
        <div class="container">
            <div >
                <h1>Raza Samurai</h1>
                <div class="raza-container">
                    <div class="sprite-container">
                    <div class="sprite samurai-animation"></div>
               
                </div>
                <div class="parrafoRaza">
                    <p>los samuráis son una raza ancestral de guerreros nobles cuya historia se remonta a tiempos antiguos. Dotados de una destreza incomparable en el arte del combate y una profunda conexión con el honor y la lealtad, los samuráis son la personificación del valor y la disciplina en el campo de batalla.
Guiados por el código del bushido, los samuráis de Ghazlo juran fidelidad a sus señores y protegen su tierra con una devoción inquebrantable. Su entrenamiento riguroso en el manejo de la espada, el arco y la lanza los convierte en adversarios formidables, capaces de enfrentarse a cualquier desafío con gracia y determinación.
Sin embargo, los samuráis de Ghazlo no solo son guerreros, sino también guardianes de la justicia y la paz. En tiempos de conflicto, lideran con honor y valentía, pero también actúan como pacificadores y protectores de los débiles en tiempos de paz.</p>
                </div>
                </div>
                
                
                <div>
                    <img src="" alt="">
                </div>
                <div>
                    <img src="" alt="">
                </div>

            </div>
            <div>
                <h1>Raza Caballero</h1>

            </div>
            <div>
                <h1>Raza golem</h1>

            </div>
            <div>
                <h1>Raza ninja</h1>

            </div>
            <div>
                <h1>Raza Esqueleto</h1>
            </div>
            <div>
                <h1>Raza Mago</h1>
            </div>
            
        </div>
    </div>
</body>
</template>

<script>
import samurai1 from '../components/samurai1.vue';
</script>

<style scoped>
  #body {
    margin: 0; /* Elimina los márgenes predeterminados del cuerpo */
    overflow: hidden; /* Evita el desplazamiento horizontal y vertical */
    
  }

  .background {
    width: 100vw; /* Ancho igual al ancho de la ventana del navegador */
    height: 100vw; /* Alto igual al alto de la ventana del navegador */
    background-image: url('../src/imagenesinicio/2d-brick-gray-wall-texture-600nw-2127747113.webp'); /* Ruta de la imagen */
    background-size: auto; /* Tamaño automático de la imagen */
    background-repeat: repeat; /* Repetir la imagen */
    background-position:  left; /* Posición de la imagen en la esquina superior izquierda */
  }

  .sprite-container {
    width: 300px; /* Nuevo ancho del sprite */
    height: 300px; /* Nuevo alto del sprite */
    overflow: hidden; /* Para ocultar las partes del sprite que se salgan del contenedor */
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%; /* Ajustar el ancho al 100% */
    height: 100%; /* Ajustar la altura al 100% */
    padding: 20px; /* Añadir relleno */
    box-sizing: border-box; /* Incluir el relleno en el tamaño total */
  }
  
  .sprite {
    width: 300px; /* Ajusta el ancho del frame del sprite */
    height: 300px; /* Ajusta la altura del frame del sprite */
    overflow: hidden;
    background-image: url('../imagenesinicio/Idle.png'); /* Ruta a la imagen del sprite */
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  @keyframes samurai-animation {
    0% { background-position: 0 0; }
    16.66% { background-position: -64px 0; }
    33.33% { background-position: -128px 0; }
    50% { background-position: -192px 0; }
    66.66% { background-position: -256px 0; }
    83.33% { background-position: -320px 0; }
    100% { background-position: 0 0; }
  }
  
  .samurai-animation {
    animation: samurai-animation 1s steps(0) infinite; ;
  }

  .parrafoRaza {
    width: 100%; 
    padding: 20px;
    border-radius: 10px;
    text-align: justify; /* Justificar el texto */
    line-height: 1.5; /* Espacio entre líneas para hacerlas más largas */
  }

  .raza-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    width: 100%; /* Ajustar el ancho del contenedor del sprite y el párrafo al 100% del contenedor padre */
  }
</style>