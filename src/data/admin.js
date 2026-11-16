// Usuario del administrador. La contraseña la valida el backend (POST /api/v1/auth/login),
// que responde con el token JWT para crear, editar y eliminar planes.
export const credencialesAdmin = {
    usuario: 'admin'
}

// Datos que se muestran en "Mi Perfil" cuando entra el administrador
export const datosAdmin = {
    nombre: 'Administrador NutriVida',
    usuario: 'admin',
    correo: 'admin@nutrivida.cl',
    rol: 'Administrador del sitio',
    clinica: 'Clínica Nutricional NutriVida — Temuco'
}
