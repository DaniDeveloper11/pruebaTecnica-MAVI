<script setup>
import { ref } from 'vue';
import ClienteService from "../services/ClienteService";
import RouterLink from "../components/UI/RouterLink.vue";
import Header from "../components/UI/Heading.vue";
import router from '../router';

// Definir propiedades del título
defineProps({
  titulo: {
    type: String
  }
});

// Definir variables para los campos del formulario
const name = ref('');
const plastname = ref('');
const mlastname = ref('');
const address = ref('');
const email = ref('');

// Función para manejar el envío del formulario
const handleSubmit = (data) => {
  ClienteService.agregarCliente(data)
    .then(respuesta => {
      console.log(respuesta);
      // Redirigir al home solo después de que la solicitud sea exitosa
      router.push({ name: 'home' });
    })
    .catch(error => console.log(error));
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="home">
        Volver
      </RouterLink>
    </div>
    <Header>{{ titulo }}</Header>

    <div class="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 class="text-2xl font-bold text-center mb-6">Nuevo Cliente</h2>
      <form @submit.prevent="handleSubmit({ name: name, plastname: plastname, mlastname: mlastname, address: address, email: email })">
        
        <!-- Campo para el nombre -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Ingresa el nombre"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <!-- Campo para el apellido paterno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="plastname">Apellido Paterno</label>
          <input
            type="text"
            id="plastname"
            v-model="plastname"
            placeholder="Ingresa el apellido paterno"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <!-- Campo para el apellido materno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="mlastname">Apellido Materno</label>
          <input
            type="text"
            id="mlastname"
            v-model="mlastname"
            placeholder="Ingresa el apellido materno"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <!-- Campo para el correo -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Correo</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa el correo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <!-- Campo para la dirección -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="address">Dirección</label>
          <input
            type="text"
            id="address"
            v-model="address"
            placeholder="Ingresa la dirección"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>



        <!-- Botón de guardar -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Guardar Usuario
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
