# NutriVida — Tienda en React

Migración del sitio de la Clínica Nutricional NutriVida (HTML + CSS + JS) a React con Vite, manteniendo el diseño de la primera entrega.

**Asignatura:** DSY1104 Desarrollo Fullstack II — Experiencia 2
**Estudiante:** Natalie Gallegos

## Cómo instalar y ejecutar

```bash
npm install
npm run dev
```

Abrir la dirección que muestra la terminal (normalmente http://localhost:5173).

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Credenciales del administrador

| Usuario | Contraseña |
| :--- | :--- |
| admin | admin |

La sesión se guarda en `localStorage` (clave `sesion`), por lo que se mantiene al recargar la página hasta presionar **Cerrar sesión**.

## Páginas y rutas

| Página | Ruta | Acceso |
| :--- | :--- | :--- |
| Index (inicio) | `/` | Público |
| Productos (catálogo) | `/productos` | Público |
| Producto (detalle) | `/producto` | Público |
| Login | `/login` | Público |
| Registro | `/registro` | Público |
| Carrito de compras | `/carrito` | Público |
| Mi Perfil | `/perfil` | Requiere sesión |
| Panel de Control | `/panel` | Solo administrador |
| Error 404 | cualquier otra ruta (`*`) | Público |

## Estructura (Atomic Design)

```
src/
├── components/
│   ├── atoms/        Logo, Avatar, Estrellas, BotonFavorito, BotonWhatsapp, MensajeFormulario...
│   ├── molecules/    TarjetaPlan, TarjetaResena, SelectorCantidad, BuscadorPlanes, FilaPlan...
│   └── organisms/    Header, Footer, ListaPlanes, SeccionResenas, FormularioLogin, FormularioRegistro,
│                     FormularioPlan, TablaPlanes, TablaCarrito, FormularioPago...
├── pages/            Home, Productos, Producto, Login, Registro, PanelControl, Carrito, Perfil, Error404
├── data/             itemsMenu.js, planes.js, resenas.js, admin.js
├── utils/            formato.js, validaciones.js, carrito.js
├── assets/img/       imágenes de la primera entrega + imagen genérica para planes nuevos
├── App.jsx           solo organiza los estados compartidos y las rutas
├── main.jsx
└── estilos.css       CSS original de la primera entrega + agregados al final
```

## Características con estado (useState)

1. **Favoritos:** cada tarjeta del catálogo se puede marcar o desmarcar (`BotonFavorito`).
2. **Búsqueda dinámica:** filtra los planes del catálogo mientras se escribe (`Productos`).
3. **Carrito de compras:** agregar planes con su cantidad de sesiones, quitar, total y compra simulada (`App`, `DetallePlan`, `Carrito`).
4. **Carrusel de reseñas:** flechas para avanzar o retroceder (`SeccionResenas`).
5. **Publicar reseña:** el formulario agrega la reseña nueva al carrusel (`Home`, `FormularioResena`).
6. **Sesión del administrador:** login, cierre de sesión y menú que cambia (`App`, `Header`).
7. **CRUD en memoria:** crear, editar y eliminar planes desde el Panel de Control (`App`, `PanelControl`).

## Elementos responsivos

1. Formulario de **Login** (React Bootstrap `Form`), que se adapta al ancho del celular.
2. Formulario de **Registro** (React Bootstrap `Form`), que pasa de dos columnas a una en celular.
3. Formulario del **Panel de Control** con `Row` / `Col` de React Bootstrap, que se apila en celular.
4. Tablas del **Panel de Control** y del **Carrito** con `Table responsive` (desplazamiento horizontal en pantallas pequeñas).
5. Catálogo de planes, sección de inicio y carrusel de reseñas, con las media queries del CSS original.

## Validaciones de formularios

Se mantienen las validaciones de la primera entrega:

- **Registro:** nombre y apellido solo letras, RUT `XX.XXX.XXX-X`, mayor de 18 años, teléfono `+569XXXXXXXX`, correo @gmail.com / @outlook.com / @duocuc.cl, contraseña segura de 8 a 15 caracteres y confirmación.
- **Login:** campos obligatorios, formato de correo y largo de contraseña.
- **Pago con tarjeta:** 16 dígitos, titular solo letras, vencimiento `MM/AA` y CVV de 3 números.

Campos de contexto agregados al registro: **peso (kg)**, **estatura (cm)** y **objetivo nutricional**.

## Pruebas

17 pruebas unitarias con Vitest y React Testing Library, documentadas en [`plan_de_pruebas.md`](plan_de_pruebas.md).
