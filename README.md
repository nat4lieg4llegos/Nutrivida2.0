# NutriVida — Tienda en React

Migración del sitio de la Clínica Nutricional NutriVida (HTML + CSS + JS) a React con Vite, manteniendo el diseño de la primera entrega.

**Asignatura:** DSY1104 Desarrollo Fullstack II — Experiencia 2
**Estudiante:** Natalie Gallegos  y Renato Le Fort

## Cómo instalar y ejecutar

1. Encender **MySQL** en XAMPP y ejecutar el backend **nutrivida-backend** (Spring Boot, puerto 8080). Flyway crea la base de datos con los 4 planes.
2. En la carpeta de este proyecto:

```bash
npm install
npm run dev
```

Abrir la dirección que muestra la terminal (http://localhost:5173). El backend solo acepta peticiones desde esa dirección (CORS).

## Conexión con el backend (Integración REST)

El catálogo y el Panel de Control ya no usan datos en memoria: hacen el CRUD contra la API REST de Spring Boot con **axios**.

| Archivo | Qué hace |
| :--- | :--- |
| `src/services/ProductoService.js` | Llama a `http://localhost:8080/api/v1/productos` (GET, POST, PUT, DELETE) |
| `src/services/AuthService.js` | Inicia sesión en `POST /api/v1/auth/login` y recibe el token JWT |
| `src/utils/adaptarPlan.js` | Convierte cada producto del backend en un plan para React (imagen y complemento) |

| Acción en la página | Petición al backend |
| :--- | :--- |
| Abrir Productos o el detalle | `GET /api/v1/productos` |
| Agregar plan (Panel de Control) | `POST /api/v1/productos` con token |
| Guardar cambios (Panel de Control) | `PUT /api/v1/productos/{id}` con token |
| Eliminar (Panel de Control) | `DELETE /api/v1/productos/{id}` con token |

Si el backend está apagado, el catálogo muestra el mensaje "No se pudieron cargar los planes".

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Credenciales del administrador

| Usuario | Contraseña |
| :--- | :--- |
| admin | admin |

El backend valida el usuario y la contraseña del administrador y entrega un **token JWT** (válido 1 hora). La sesión se guarda en `localStorage` (claves `sesion` y `token`) y se mantiene al recargar la página hasta presionar **Cerrar sesión**, que borra ambas. Si el token vence, hay que cerrar sesión y volver a ingresar.

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
├── services/         ProductoService.js, AuthService.js (axios → backend Spring Boot)
├── utils/            formato.js, validaciones.js, carrito.js, adaptarPlan.js
├── assets/img/       imágenes de la primera entrega + imagen genérica para planes nuevos
├── App.jsx           organiza los estados compartidos, las rutas y la carga de planes desde el backend
├── main.jsx
└── estilos.css       CSS original de la primera entrega + agregados al final
```

## Características con estado (useState)

1. **Favoritos:** cada tarjeta del catálogo se puede marcar o desmarcar (`BotonFavorito`).
2. **Búsqueda dinámica:** filtra los planes del catálogo mientras se escribe (`Productos`).
3. **Carrito de compras:** agregar planes con su cantidad de sesiones, quitar, total y compra simulada (`App`, `DetallePlan`, `Carrito`).
   Cada plan ofrece además un **complemento recomendado** a la venta (ej: proteína en polvo en el plan deportivo, carne de soya en el plan vegano) que se agrega al carrito como producto aparte (`TarjetaComplemento`).
4. **Carrusel de reseñas:** flechas para avanzar o retroceder (`SeccionResenas`).
5. **Publicar reseña:** el formulario agrega la reseña nueva al carrusel (`Home`, `FormularioResena`).
6. **Sesión del administrador:** login, cierre de sesión y menú que cambia (`App`, `Header`).
7. **CRUD con el backend:** crear, editar y eliminar planes desde el Panel de Control, guardados en MySQL a través de la API REST (`App`, `PanelControl`, `ProductoService`).

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

22 pruebas unitarias con Vitest y React Testing Library, documentadas en [`plan_de_pruebas.md`](plan_de_pruebas.md).
