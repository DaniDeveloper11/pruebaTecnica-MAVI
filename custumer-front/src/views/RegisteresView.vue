<script setup>
import { ref, onMounted, computed } from 'vue';
import TableService from '../services/TableService';
import { useRoute } from 'vue-router';
import Header from "../components/UI/Heading.vue";
import RouterLink from "../components/UI/RouterLink.vue";
import { ArrowDownIcon, FunnelIcon } from '@heroicons/vue/24/solid';  // Importamos el ícono
import PlusButton from '../components/UI/PlusButton.vue';
import ModalPost from '../components/UI/ModalPost.vue';
import { error } from 'jquery';




const route = useRoute();
const { name } = route.params;

const tabla = ref([]);
const columnas = ref([]);
const searchTerm = ref('');
const filtroColumna = ref('');
const filtroValoresUnicos = ref([]);
const sortKey = ref(''); // La columna por la que se ordena
const sortOrder = ref('asc'); // Estado de la ordenación: 'asc' o 'desc'
const isModalOpen = ref(false);


defineProps({
  titulo: {
    type: String
  }
});

onMounted(() => {
  TableService.obtenerTabla(name)
    .then((data) => {
      tabla.value = data;
      columnas.value = Object.keys(data[0]);
      filtroValoresUnicos.value = [...new Set(data.map(item => item[columnas.value[0]]))];
    })
    .catch(error => console.log(error));
});

// Función para cambiar el estado de la ordenación
const toggleSort = (col) => {
  if (sortKey.value === col) {
    // Si ya estamos ordenando por esta columna, invertimos el orden
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Si es una nueva columna, ordenamos por esta en orden ascendente
    sortKey.value = col;
    sortOrder.value = 'asc';
  }
};

// Computed para filtrar y ordenar los datos de la tabla
const tablaFiltrada = computed(() => {
  let datosFiltrados = [...tabla.value];

  // Aplicar el término de búsqueda
  if (searchTerm.value) {
    datosFiltrados = datosFiltrados.filter(row =>
      columnas.value.some(col =>
        String(row[col]).toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );
  }

  // Aplicar filtro de columna si está seleccionado
  if (filtroColumna.value) {
    datosFiltrados = datosFiltrados.filter(row => row[columnas.value[0]] === filtroColumna.value);
  }

  // Aplicar ordenación
  if (sortKey.value) {
    datosFiltrados.sort((a, b) => {
      const valA = a[sortKey.value];
      const valB = b[sortKey.value];

      if (sortOrder.value === 'asc') {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });
  }

  return datosFiltrados;
});

//Funcion para abrir el modal
const openModal = () => {
  isModalOpen.value = true
}

const agregarRegistro = (formData) => {
  console.log(formData)
  TableService.agregarRegister(name,formData)
  .then(respuesta => {
    console.log(respuesta);
  })
  .catch(error => console.log(error));
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="visualizar-tabla">Volver</RouterLink>
    </div>

    <Header>{{ titulo }}</Header>
    <h1 class="text-lg font-bold mb-4">Tabla: {{ name }}</h1>



    <div class="mt-8 flow-root">

      <div class="flex justify-end gap gap-2 items-center py-5 px-1 ">
        <!-- Buscador -->
        <input v-model="searchTerm" type="text" placeholder="Buscar..."
          class="w-44 sm:max-w-m border border-gray-300 rounded-md sm:py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

        <div class="relative max-w-s ">
          <FunnelIcon class="absolute top-1 left-0 pl-3 flex items-center pointer-events-none h-8 w-8 text-gray-400" />

          <select v-model="filtroColumna"
            class=" cursor-pointer pl-10 pr-8 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="" > Todos
            </option>
            <option v-for="valor in filtroValoresUnicos" :key="valor" :value="valor">
              {{ valor }}
            </option>
          </select>
        </div>
        <!-- Filtro por columna (por ejemplo, primera columna) -->
        <div>  
        <PlusButton :status="!(columnas.length > 0)" @click="openModal"></PlusButton>

        </div> 



      </div>


      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">




          <table v-if="tablaFiltrada.length > 0" class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr class="divide-x divide-gray-200">
                <!-- Renderizar encabezados dinámicos con ícono -->
                <th v-for="col in columnas" :key="col"
                  class="py-3.5 pl-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                  @click="toggleSort(col)">
                  <div class="flex items-center">
                    {{ col }}
                    <!-- Añadir ícono de flecha dependiendo del estado de la ordenación -->
                    <ArrowDownIcon v-if="sortKey === col && sortOrder === 'asc'" class="h-5 w-5 text-gray-500 ml-2" />
                    <ArrowDownIcon v-if="sortKey === col && sortOrder === 'desc'"
                      class="h-5 w-5 text-gray-500 ml-2 transform rotate-180" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(row, index) in tablaFiltrada" :key="index" class="divide-x divide-gray-200">
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
    <ModalPost v-model:open="isModalOpen" :columnas="columnas" :name="name" @agregar-registro="agregarRegistro"></ModalPost>
  </div>



</template>
