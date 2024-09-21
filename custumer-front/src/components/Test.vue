<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <!-- Botón para cerrar el modal -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
  
        <!-- Contenido dinámico del modal -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Prop para controlar si el modal es visible o no
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  
  // Emitir eventos al padre para abrir/cerrar el modal
  const emit = defineEmits(['update:modelValue']);
  
  // Variable reactiva para manejar la visibilidad del modal
  const isVisible = ref(props.modelValue);
  
  // Actualizar la visibilidad del modal si cambia desde el padre
  watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal;
  });
  
  // Función para cerrar el modal
  const closeModal = () => {
    emit('update:modelValue', false);
  };
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales aquí si lo deseas */
  </style>
  