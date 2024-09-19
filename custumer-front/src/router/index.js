import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/UsersView.vue'

import { useAuthStore } from '../stores/authStore';

function isAuthenticated() {
    return !!sessionStorage.getItem('token'); 
  }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'), // Cambia a la vista correcta de Login
        props: { titulo: 'Iniciar Sesión' },
      },
    {
      path: '/',
      name: 'home',
      component: Inicio,
      props:{titulo:'Listado de Clintes'},
      meta: { requiresAuth: true } 
    },
    {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props:{titulo:'Agregar Cliente'},
      meta: { requiresAuth: true } 

    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClienteView.vue'),
      props:{titulo:'Editar Cliente'},
      meta: { requiresAuth: true } 

    },
    {
      path: '/visualizar-tabla',
      name: 'visualizar-tabla',
      component: () => import('../views/TableView.vue'),
      props:{titulo:'Tablas'},
      meta: { requiresAuth: true } 

    },
    {
      path: '/visualizar-registros:name',
      name: 'visualizar-registros',
      component: () => import('../views/RegisteresView.vue'),
      props:{titulo:'Ver Registros'},
      meta: { requiresAuth: true } 

    },

    

  ]
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router
