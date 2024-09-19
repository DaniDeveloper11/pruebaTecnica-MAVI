<script setup>
import {RouterLink} from 'vue-router';

const props = defineProps({
    name:{type:String}
})

</script>

<template>
    <RouterLink :to="{name:'visualizar-registros',params:{name:props.name}}">

    <div class="overflow-hidden rounded-lg bg-red shadow cursor-pointer" @click="handleTable">
        <div class="px-4 py-5 sm:p-6">
            <p><slot></slot></p>
        </div>
    </div>
</RouterLink>

</template>