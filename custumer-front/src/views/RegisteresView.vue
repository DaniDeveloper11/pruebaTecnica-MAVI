<script setup>
import { ref, onMounted } from 'vue';
import TableService from '../services/TableService';
import { useRoute } from 'vue-router';
import Header from "../components/UI/Heading.vue";
import RouterLink from "../components/UI/RouterLink.vue";

const route = useRoute();

const { name } = route.params; // Obtenemos el nombre de la tabla desde la URL
const tabla = ref({}) //Almacena los datos de la tabla
const columnas = ref([]); // Almacena las claves de las columnas

defineProps({
  titulo: {
    type: String
  }
});

// Obtener los datos del cliente al montar el componente
onMounted(() => {
  TableService.obtenerTabla(name)
    .then((data) => {
      tabla.value = data;
      columnas.value = Object.keys(data[0]); // Obtener las claves del primer objeto como columnas
    })
    .catch(error => console.log(error));
});

</script>

<template>

<div class="flex justify-end">
      <RouterLink to="visualizar-tabla">
        Volver
      </RouterLink>
    </div>
    <Header>{{ titulo }}</Header>
    <h1 class="text-lg font-bold mb-4">Tabla: {{ name }}</h1>
  
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table v-if="tabla.length > 0" class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr class="divide-x divide-gray-200">
                <!-- Renderizar encabezados dinámicos -->
                <th v-for="col in columnas" :key="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  {{ col }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <!-- Renderizar filas dinámicas -->
              <tr v-for="(row, index) in tabla" :key="index" class="divide-x divide-gray-200">
                <td v-for="(value, key) in row" :key="key" class="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay registros</p>
        </div>
      </div>
    </div>
  </template>
  
