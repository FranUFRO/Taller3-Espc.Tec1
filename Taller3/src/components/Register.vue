<template>
    <div class="background">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h2>Registrar Usuario</h2>
              </div>
              <div class="card-body">
                <form @submit.prevent="handleLogin">
                  <div class="form-group">
                    <label class="textl" for="username">Nombre de Usuario</label>
                    <input
                      type="text"
                      id="username"
                      v-model="username"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group mt-3">
                    <label class="textl" for="password">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group mt-4 text-center">
                    <button type="submit" class="btn btn-primary w-100">Registrar</button>
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
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password
      });
      router.push('/login');
    } catch (error) {
      errorMessage = 'Credenciales inválidas';
      console.error('Error durante el inicio de sesión:', error);
    }
  };
  </script>
  
  <style scoped>
  .background {
    background-image: url('C:\Users\LEVEENT\Desktop\Taller3-Espc.Tec1\Taller3\src\imagenesinicio\2d-brick-gray-wall-texture-600nw-2127747113.webp'); /* Ruta a tu imagen de fondo */
    background-size: cover;
    background-position: center;
    min-height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    margin-top: 2rem;
    background-color: rgba(0, 0, 0, 0.9); 
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
    background-image:url("https://img.freepik.com/free-photo/grunge-vintage-paper-background-with-stains_1048-15821.jpg") ;
  }
  .textl{
    color: white;
  }
  
  .card-header {
    background-color: #5c5e4c;
    color: rgb(255, 255, 255);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  .btn-primary {
    background-color: #373a3d;
    border-color: #7e8038;
  }
  
  .btn-primary:hover {
    background-color: #96930a;
    border-color: #550c51;
  }
  
  .form-control {
    border: 1px solid #ced4da;
  }
  
  .text-danger {
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
  </style>
  