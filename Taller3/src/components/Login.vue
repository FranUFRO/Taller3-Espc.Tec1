<template>
  <div class="background">
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
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/autentificar';

const router = useRouter();
const authStore = useAuthStore();

let username = '';
let password = '';
let errorMessage = null;

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    });
    authStore.login(username);
    router.push('/elegirPersonaje');
  } catch (error) {
    errorMessage = 'Credenciales inválidas';
    console.error('Error durante el inicio de sesión:', error);
  }
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
