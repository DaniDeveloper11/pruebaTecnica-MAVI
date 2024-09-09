import { defineStore } from 'pinia';
import $ from 'jquery';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: !!sessionStorage.getItem('token'),
  }),
  actions: {
    login(email, password) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: 'http://localhost:3000/auth/login', // Ajusta la URL del backend
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          success: (response) => {
            this.token = response.token;
            this.isAuthenticated = true;

            // Guardar el token en localStorage para mantener la sesión
            sessionStorage.setItem('token', this.token);

            resolve(true);
          },
          error: (err) => {
            console.error('Error en el login:', err);
            reject(false);
          },
        });
      });
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;

      // Eliminar el token de sessionStorage
      sessionStorage.removeItem('token');
    },

    loadToken() {
      // Cargar el token desde sessionStorage al iniciar la aplicación
      const token = sessionStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    }
  },
});
