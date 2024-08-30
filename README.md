
# Proyecto E-commerce Backend

Este proyecto es una aplicación backend desarrollada con Node.js y Express para un curso de backend de Coderhouse. La aplicación permite la gestión de usuarios, productos, y carritos de compra, incluyendo operaciones CRUD completas y una lógica de compra que genera tickets para los usuarios.

## Características Principales

- **Gestión de Usuarios**: Registro, autenticación, actualización y eliminación de usuarios.
- **Gestión de Productos**: Creación, lectura, actualización y eliminación de productos (solo para administradores).
- **Gestión de Carritos**: Añadir productos a un carrito, ver el contenido del carrito, y completar la compra.
- **Generación de Tickets**: Al completar una compra, se genera un ticket con la información de la transacción.

## Configuración del Proyecto

### Requisitos

- Node.js
- MongoDB

La aplicación estará disponible en `http://localhost:8080`.

## Resumen de Endpoints

### Usuarios

- **Registrar Usuario**: `POST /api/users/register`
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "securepassword",
      "role": "user"
    }
    ```

- **Iniciar Sesión**: `POST /api/users/login`
    ```json
    {
      "email": "johndoe@example.com",
      "password": "securepassword"
    }
    ```

- **Obtener Todos los Usuarios**: `GET /api/users`

- **Obtener Usuario por ID**: `GET /api/users/:id`

- **Actualizar Usuario**: `PUT /api/users/:id`
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "newpassword",
      "role": "admin"
    }
    ```

- **Eliminar Usuario**: `DELETE /api/users/:id`

### Productos

- **Crear Producto**: `POST /api/products` (solo administradores)
    ```json
    {
      "name": "Producto 1",
      "description": "Descripción del producto",
      "price": 100,
      "stock": 10
    }
    ```

- **Obtener Todos los Productos**: `GET /api/products`

- **Obtener Producto por ID**: `GET /api/products/:id`

- **Actualizar Producto**: `PUT /api/products/:id` (solo administradores)

- **Eliminar Producto**: `DELETE /api/products/:id` (solo administradores)

### Carritos

- **Crear Carrito**: `POST /api/carts`

- **Obtener Todos los Carritos**: `GET /api/carts`

- **Obtener Carrito por ID**: `GET /api/carts/:id`

- **Agregar Producto al Carrito**: `POST /api/carts/:cid/products`
    ```json
    {
      "productId": "id_del_producto",
      "quantity": 2
    }
    ```

- **Eliminar Producto del Carrito**: `DELETE /api/carts/:cid/products/:pid`

- **Completar Compra**: `POST /api/carts/:cid/purchase`

## Pruebas

Puedes probar los endpoints utilizando herramientas como Postman o cURL. Asegúrate de autenticarte y enviar los encabezados necesarios para acceder a los endpoints protegidos.

---

Este README.md debe proporcionar una guía completa para que los usuarios configuren y utilicen el proyecto. Si tienes alguna duda o encuentras un problema, consulta la documentación o contacta con el desarrollador.
