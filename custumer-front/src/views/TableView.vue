<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import RouterLink from "../components/UI/RouterLink.vue";
import Header from "../components/UI/Heading.vue";
import router from '../router';

const route = useRoute();
const table = ref({})

defineProps({
    titulo:{
        type:String
    }
});
</script>

<template>
    <div>
    <div class="flex justify-end">
      <RouterLink to="home">
        Volver
      </RouterLink>
    </div>
    <Header>{{ titulo }}</Header>

    


    </div>
</template>