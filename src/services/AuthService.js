import axios from 'axios';

// Endpoint de inicio de sesión del backend (entrega el token JWT)
const BASE_URL = 'http://localhost:8080/api/v1/auth';

class AuthService {
    login(usuario, password) {
        return axios.post(`${BASE_URL}/login`, { usuario, password });
    }
}

export default new AuthService();
