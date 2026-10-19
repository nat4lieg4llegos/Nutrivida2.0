// Menú cuando no hay sesión iniciada
export const itemsMenu = [
    { href: '/', label: 'Inicio' },
    { href: '/productos', label: 'Productos' },
    { href: '/carrito', label: 'Carrito' },
    { href: '/login', label: 'Iniciar Sesión' },
    { href: '/registro', label: 'Registrarse' }
]

// Menú cuando el usuario inició sesión
export const itemsMenuSesion = [
    { href: '/', label: 'Inicio' },
    { href: '/productos', label: 'Productos' },
    { href: '/carrito', label: 'Carrito' },
    { href: '/perfil', label: 'Mi Perfil' }
]

// Enlace extra que solo ve el administrador
export const itemMenuAdmin = { href: '/panel', label: 'Panel de Control' }
