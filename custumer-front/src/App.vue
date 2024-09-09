<script setup>
import {computed,ref} from 'vue';
import {useAuthStore} from './stores/authStore'
import {RouterLink, RouterView,useRouter} from 'vue-router'


const store = useAuthStore();
const router = useRouter();
const isToken = computed(() => store.isAuthenticated)

const logout = () => {
  store.logout();
  router.push({name:'login'})
};

</script>

<template>
  <header v-if="isToken" class="bg-slate-800">
    <div class="mx-auto max-w-6xl py-10 flex justify-between">
      <h1 class="text-4xl font-extrabold text-white">
        Administrador de Clientes
      </h1>
      <button class="text-white" @click="logout" >Cerrar Sesión</button>
    </div>
  </header>

  <main class="max-w-6xl mx-auto mt-10 p-5">
    <RouterView />

  </main>
</template>

