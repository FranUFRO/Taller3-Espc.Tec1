<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-header text-center">
              <h2>Iniciar Sesión</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="form-group">
                  <label for="username">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="username"
                    v-model="username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group mt-3">
                  <label for="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group mt-4 text-center">
                  <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                </div>
              </form>
              <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/autentificar.js'
  const router = useRouter()
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const authStore = useAuthStore()

  const handleLogin = () => {
  fetch('users.txt')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const foundUser = lines.find(line => {
        const [storedUsername, storedPassword] = line.split(':');
        return storedUsername.trim() === username.value && storedPassword.trim() === password.value;
      });
      if (foundUser) {
        authStore.login(username.value);  
        router.push('/juego'); 
      } else {
        errorMessage.value = 'Usuario o contraseña incorrectos';
      }
    })
    .catch(error => {
      console.error('Error al leer el archivo de usuarios:', error);
      errorMessage.value = 'Error al iniciar sesión';
    });
};
  </script>
  
  <style scoped>
  .card {
    margin-top: 2rem;
  }
  
  .card-header {
    background-color: #343a40;
    color: white;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
  }
  </style>
  