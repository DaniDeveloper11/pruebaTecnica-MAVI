import $ from 'jquery';
const token = sessionStorage.getItem('token')

export default {

  // Obtener todos los clientes
  obtenerClientes() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/api/clientes', 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  // Crear un nuevo cliente
  agregarCliente(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/api/clientes',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        contentType: 'application/json',
        data: JSON.stringify(data), 
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  // Obtener un cliente por su ID
  obtenerCliente(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/api/clientes/' + id,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  // Actualizar los datos de un cliente
  actualizarCliente(id, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/api/clientes/' + id,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        contentType: 'application/json',
        data: JSON.stringify(data), 
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  // Cambiar el estado de un cliente (activo o inactivo)
  cambiarEstadoCliente(id, status) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:3000/api/clientes/${id}/status`,
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        contentType: 'application/json',
        data: JSON.stringify({ status: !!status }), 
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  // Eliminar un cliente
  eliminarCliente(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:3000/api/clientes/' + id,
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        success: (response) => {
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
};
