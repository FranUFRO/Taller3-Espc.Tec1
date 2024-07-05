<template>
    
    <div class="container">
      <div>
        
        <div class="sprite skeleton-animation"></div>
      </div>
    </div>  
      
</template>

<script setup>

</script>

<style scoped>


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.sprite {
  width: 64px; 
  height: 64px; 
  background-image: url('../imagenesinicio/sIdle.png'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-color: red;
}

@keyframes skeleton-animation {
  0% { background-position: 0 0; }
  16.66% { background-position: -64px 0; }
  33.33% { background-position: -128px 0; }
  50% { background-position: -192px 0; }
  66.66% { background-position: -256px 0; }
  83.33% { background-position: -320px 0; }
  100% { background-position: 0 0; }
}

.skeleton-animation {
  animation: skeleton-animation 3s steps(6) infinite;
}
</style>
