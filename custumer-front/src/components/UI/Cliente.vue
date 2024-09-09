<script setup>
import {computed} from 'vue'
import {RouterLink} from 'vue-router'

const props = defineProps({
    cliente:{
        type:Object
    }
})

defineEmits(['actualizar-estado','eliminar-cliente'])



const estadoCliente = computed(() => {
   return props.cliente.status
})

const nombreCliente = computed(() => {
    return props.cliente.name + ' ' + props.cliente.plastname + ' ' + props.cliente.mlastname
});


</script>
<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
            <p class="text-gray-500">{{ cliente.email }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold">{{ cliente.address }}</p>
            <!-- <p class="text-gray-600">{{ cliente.puesto }}</p> -->
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm">
            <button 
                class="inline-flex rounded-full px-3 text-xs font-semibold leading-5"
                :class="[estadoCliente ?'bg-green-200':'bg-red-200']"
                >
            {{estadoCliente ? 'Activo':'Inactivo' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <RouterLink class="text-indigo-600 hover:text-indigo-900 mr-5" :to="{name: 'editar-cliente', params:{id:cliente.id}}">Editar</RouterLink>

            <button 
                class="text-red-600 hover:text-red-900"
                @click="$event => $emit('eliminar-cliente', cliente.id)">
                Eliminar
            </button>
        </td>
    </tr>
</template>