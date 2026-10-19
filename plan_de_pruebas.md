# Plan de Pruebas Unitarias — NutriVida (React)

**Estudiante:** Natalie Gallegos
<br />

**Asignatura:** DSY1104 Desarrollo Fullstack II — Experiencia 2
<br />

**Herramientas:** Vitest + React Testing Library (entorno jsdom)
<br />

**Comando para ejecutar:** `npm test` (o `npx vitest run` para una sola ejecución)
<br />

**Fecha de ejecución:** 19-10-2026

## Alcance

Se prueban los componentes y funcionalidades críticas de la tienda:

- **Catálogo:** tarjeta de producto, favoritos y búsqueda dinámica.
- **Compra:** cantidad de sesiones, total y carrito.
- **Formularios:** validación del registro y del login.
- **Seguridad:** acceso privado al Panel de Control (sesión con localStorage).
- **CRUD en memoria:** crear, editar y eliminar planes.
- **Enrutamiento:** ruta comodín 404.
- **Interacción:** carrusel de reseñas.

Todas las pruebas siguen el patrón **AAA**: Arrange (preparar), Act (ejecutar), Assert (verificar).

## Casos de prueba

| ID | Componente / Descripción | Caso de Prueba (it) | Preparación (Arrange) | Acción (Act) | Resultado Esperado (Assert) | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| PU-001 | TarjetaPlan | Debe mostrar el nombre y el precio formateado del plan | Crear un plan mock con precio 35000 | Renderizar la tarjeta | Se ve "Plan de pérdida de peso" y "$35.000" | ✅ Pasa |
| PU-002 | BotonFavorito | Debe cambiar el texto a "En favoritos" al hacer clic | Renderizar el botón | Hacer un clic | El texto contiene "En favoritos" | ✅ Pasa |
| PU-003 | BotonFavorito | Debe volver a "Agregar a favoritos" al hacer clic dos veces | Renderizar el botón | Hacer dos clics | El texto contiene "Agregar a favoritos" | ✅ Pasa |
| PU-004 | Productos (búsqueda) | Debe filtrar los planes según el texto de búsqueda | Renderizar el catálogo con los 4 planes | Escribir "deportiva" en el buscador | Solo se ve "Plan nutrición deportiva" | ✅ Pasa |
| PU-005 | DetallePlan | Debe actualizar el total al aumentar la cantidad de sesiones | Renderizar el detalle del plan de $35.000 | Presionar "+" | El total muestra "$70.000" | ✅ Pasa |
| PU-006 | calcularTotal (carrito) | Debe sumar precio por cantidad de cada plan del carrito | Carrito mock: 2 × $35.000 y 1 × $45.000 | Llamar a `calcularTotal` | El resultado es 115000 | ✅ Pasa |
| PU-007 | DetallePlan (carrito) | Debe enviar el plan y la cantidad al carrito | Renderizar el detalle con una función mock | Presionar "+" y luego "Agregar al carrito" | La función recibe el plan y la cantidad 2 | ✅ Pasa |
| PU-008 | FormularioRegistro | Debe rechazar un correo que no sea gmail, outlook o duocuc | Completar todos los campos válidos con correo "ana@yahoo.com" | Presionar "Registrar" | Aparece el mensaje de dominios permitidos | ✅ Pasa |
| PU-009 | FormularioLogin | Debe dar acceso de administrador con admin / admin | Renderizar el login con una función mock | Escribir admin / admin y enviar | La función se llama con "admin" | ✅ Pasa |
| PU-010 | FormularioLogin | Debe rechazar una contraseña incorrecta del administrador | Renderizar el login con una función mock | Escribir admin / 1234 y enviar | No se inicia sesión y aparece un mensaje de error | ✅ Pasa |
| PU-011 | App (ruta protegida) | Debe bloquear el Panel de Control si no hay sesión | localStorage vacío | Abrir la ruta /panel | Se muestra "Acceso restringido" | ✅ Pasa |
| PU-012 | App (CRUD — crear) | Debe crear un plan nuevo desde el Panel de Control | Sesión "admin" en localStorage, abrir /panel | Completar el formulario y presionar "Agregar plan" | El plan aparece en la tabla y el catálogo tiene 5 planes | ✅ Pasa |
| PU-013 | App (CRUD — eliminar) | Debe eliminar un plan desde el Panel de Control | Sesión "admin" en localStorage, abrir /panel | Presionar "Eliminar" en el primer plan | El plan desaparece y quedan 3 planes | ✅ Pasa |
| PU-014 | App (CRUD — editar) | Debe editar el precio de un plan desde el Panel de Control | Sesión "admin" en localStorage, abrir /panel | Presionar "Editar", cambiar el precio a 39990 y guardar | La tabla muestra "$39.990" | ✅ Pasa |
| PU-015 | App (ruta 404) | Debe mostrar la página 404 en una ruta que no existe | Sin preparación especial | Abrir /ruta-que-no-existe | Se muestra "Página no encontrada" | ✅ Pasa |
| PU-016 | App (carrito) | Debe agregar un plan al carrito y mostrar el total | Abrir /producto | Presionar "Agregar al carrito" y luego "Carrito (1)" | Se abre el carrito con el total $35.000 | ✅ Pasa |
| PU-017 | SeccionResenas | Debe mostrar la siguiente reseña al presionar la flecha derecha | Renderizar el carrusel (3 reseñas visibles) | Presionar la flecha derecha | La reseña de Fernanda queda visible y la de Camila se oculta | ✅ Pasa |

## Resultado de la ejecución

```
Test Files  9 passed (9)
     Tests  17 passed (17)
```

Se ejecutaron 17 pruebas unitarias y las 17 pasaron. No se detectaron defectos.
