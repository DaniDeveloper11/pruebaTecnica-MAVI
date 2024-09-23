<script setup>
import { BoldIcon, PlusIcon } from '@heroicons/vue/24/solid';  // Importamos el ícono

defineProps({
    status:Boolean
})

</script>
<template>
        <button :disabled="status" type="button"
            class=" rounded-full bg-green-300 p-2 text-white shadow-s}
             hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
             focus-visible:outline-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
   

</template>