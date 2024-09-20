<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
//import RouterLink from "../components/UI/RouterLink.vue";
import Header from "../components/UI/Heading.vue";
import router from '../router';
import CardTable from '../components/CardTable.vue';
import TableService from '../services/TableService';



const route = useRoute();
const tables = ref()

defineProps({
    titulo:{
        type:String
    }
});

onMounted(() => {
  getTables();
})

const getTables = () => {
  TableService.obtenerTablas()
    .then((data) => tables.value = data)
    .catch(error => console.log('Hubo un error'));
}

</script>

<template>
    <div>
    <div class="flex justify-end">
        <!-- <RouterLink to="home"></RouterLink> -->
    </div>
    <Header>{{ titulo }}</Header>
 
    <CardTable v-bind:name="table.Tables_in_sev" v-for="table in tables" :key="table.Tables_in_sev">{{ table.Tables_in_sev }}</CardTable>



    </div>
</template>