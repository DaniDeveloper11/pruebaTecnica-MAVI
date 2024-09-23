<template>
    <TransitionRoot as="template" :show="isVisible">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed top-10 bottom-10 sm:inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 max-h-screen overflow-y-auto">
                            <!-- <div> -->
                                <div class="mt-3 sm:mt-5">
                                    <form>
                                        <h2 class="text-lg font-semibold leading-7 text-gray-900">{{ name }}</h2>
                                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                                            Añade un Registro a la Base de Datos {{ name }}
                                        </p>

                                        <!-- Sección con scroll cuando hay demasiados inputs -->
                                        <div class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0 sm:max-h-[75vh] max-h-96 overflow-y-auto">
                                            <div v-for="(item, index) in columnas" :key="index"
                                                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                                <label class="block text-gray-700 font-bold mb-2"
                                                    :for=item[index]>{{ item }}</label>
                                                <input v-model="formData[item]" type="text" :id=item[index] :placeholder="'Ingresa ' + item"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                                    required />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            <!-- </div> -->
                            <div class=" mt-5 mb-16 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                                    @click="submitForm()">Submit</button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                    @click="closeModal()" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    },
    columnas: {
        type: Array,  // Cambié el tipo a Array ya que columnas debe ser un array de strings
    },
    name: {
        type: String
    }
})


const formData = ref({});

const emit = defineEmits(['update:open','agregar-registro']);
const isVisible = ref(props.open);
watch(() => props.open, (newVal) => {
    isVisible.value = newVal;
})

const closeModal = () => {
    emit('update:open', false);
};

watch(() => props.columnas, (newVal) => {
  newVal.forEach(column => {
    formData.value[column] = '';  // Inicializa con un string vacío o el valor que desees
  });
}, { immediate: true });

const submitForm = () => {
    emit('agregar-registro', formData.value)
}

</script>
