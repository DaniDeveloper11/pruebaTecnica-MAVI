<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ClienteService from "../services/ClienteService";
import RouterLink from "../components/UI/RouterLink.vue";
import Header from "../components/UI/Heading.vue";
import router from '../router';

const route = useRoute();
const { id } = route.params; // Obtenemos el ID del cliente desde la URL
const cliente = ref({}); // Almacena los datos del cliente

defineProps({
  titulo: {
    type: String
  }
});

// Obtener los datos del cliente al montar el componente
onMounted(() => {
  ClienteService.obtenerCliente(id)
    .then((data) => cliente.value = data) // Almacena los datos del cliente
    .catch(error => console.log(error));
});

// Función para manejar la actualización del cliente
const handleSubmit = (data) => {
  ClienteService.actualizarCliente(id, data)
    .then(() => router.push({ name: 'home' })) // Redirigir al home después de actualizar
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
      <h2 class="text-2xl font-bold text-center mb-6">Editar Cliente</h2>
      <form @submit.prevent="handleSubmit({
        name: cliente.name,
        plastname: cliente.plastname,
        mlastname: cliente.mlastname,
        address: cliente.address,
        email: cliente.email
      })">
        <!-- Nombre -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">Nombre</label>
          <input type="text" id="name" v-model="cliente.name" placeholder="Ingresa el nombre"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required />
        </div>

        <!-- Apellido Paterno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="plastname">Apellido Paterno</label>
          <input type="text" id="plastname" v-model="cliente.plastname" placeholder="Ingresa el apellido paterno"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required />
        </div>

        <!-- Apellido Materno -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="mlastname">Apellido Materno</label>
          <input type="text" id="mlastname" v-model="cliente.mlastname" placeholder="Ingresa el apellido materno"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required />
        </div>

        <!-- Correo -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">Correo</label>
          <input type="email" id="email" v-model="cliente.email" placeholder="Ingresa el correo"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required />
        </div>

        <!-- Dirección -->
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="address">Dirección</label>
          <input type="text" id="address" v-model="cliente.address" placeholder="Ingresa la dirección"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            required />
        </div>


        <!-- Botón de guardar -->
        <div class="flex justify-center">
          <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
