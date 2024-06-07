import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ElegirPersonajeView from '../views/ElegirPersonajeView.vue'
import InicioView from '../views/InicioView.vue'
import JuegoView from '../views/JuegoView.vue'
import LoginView from '../views/LoginView.vue'
import RecordsView from '../views/RecordsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InicioView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/elegirPersonaje',
      name: 'elegirPersonaje',
      component: ElegirPersonajeView
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/juego',
      name: 'juego',
      component: JuegoView
    },
    {
      path: '/login',
      name: 'login ',
      component: LoginView
    },
    {
      path: '/records',
      name: 'records',
      component: RecordsView
    },
  ]
})


export default router
