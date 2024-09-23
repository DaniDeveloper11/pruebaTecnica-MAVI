<script setup>
import {RouterLink} from 'vue-router';

const props = defineProps({
    name:{type:String}
})

</script>

<template>
    <RouterLink :to="{name:'visualizar-registros',params:{name:props.name}}">

        <div class="overflow-hidden border-solid border-2 border-gray-300 bg-gray-200 hover:bg-red-200 hover:border-red-300 mx-auto rounded-lg shadow cursor-pointer h-28 text-center" >
            <div class="px-4 py-10 sm:p-6">
                <p class="text-2xl font-bold text-gray-500"><slot></slot></p>
            </div>
        </div>
    </RouterLink>   

</template>