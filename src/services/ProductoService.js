import axios from 'axios';

// Dirección del backend Spring Boot (nutrivida-backend)
const BASE_URL = 'http://localhost:8080/api/v1/productos';

// Crear, editar y eliminar requieren el token JWT del administrador
function cabeceraConToken() {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
}

class ProductoService {
    getAllProductos() {
        return axios.get(BASE_URL);
    }

    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto, cabeceraConToken());
    }

    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto, cabeceraConToken());
    }

    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`, cabeceraConToken());
    }
}

export default new ProductoService();
