<script setup>
import {RouterLink} from 'vue-router'

defineProps({
    to:{
        type:String
    }
})
</script>
<template>
        <div>
        <RouterLink :to="{name:to}"
        class=" rounded-full sm:rounded bg-blue-600 py-2 px-3 text-white uppercase font-bold text-xs shadow">
            <slot></slot>
        </RouterLink>
    </div>
</template>