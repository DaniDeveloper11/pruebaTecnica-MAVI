<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Correo</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
  
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </div>
  
        <div v-if="error" class="text-red-500 mt-4 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '../stores/authStore';
  
  const email = ref('');
  const password = ref('');
  const error = ref(false);
  const errorMessage = ref('');
  
  // Usamos useRouter para redirigir después del login
  const router = useRouter();
  const route = useRoute(); // Para capturar la ruta de origen si fue redirigido
  
  // Auth store para manejar la autenticación
  const authStore = useAuthStore();
  
  const loginUser = async () => {
    try {
      const success = await authStore.login(email.value, password.value);
      console.log(success)
      if (success) {
        router.push({name:'home'})
      }
    } catch (err) {
      error.value = true;
      errorMessage.value = 'Correo o contraseña incorrectos';
    }
  };
  </script>
  