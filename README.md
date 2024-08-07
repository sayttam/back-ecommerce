# back-ecommerce

Este proyecto fue creado con Node.js y Express para curso de backend de Coderhouse

Conexión mongoDB:

mongodb+srv://admin:123@proyectocoder-mjb.vxoxal7.mongodb.net



Resumen de Endpoints

//           USUARIOS

POST /api/sessions/register = Registrar nuevo usuario

**Cuerpo de la solicitud:**
{
    "first_name": "John",
    "last_name": "Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "password": "password123",
    "cart": "ObjectId",
    "role": "user"
}

POST /api/sessions/login = Autentica un usuario y devuelve un token JWT

**Cuerpo de la solicitud:**
{
    "email": "john.doe@example.com",
    "password": "password123"
}

PUT /api/sessions/users/:uid = Actualiza la información de un usuario existente

**Cuerpo de la solicitud:**
{
    "first_name": "John",
    "last_name": "Doe",
    "age": 31,
    "email": "john.doe@example.com",
    "password": "newpassword123",
    "cart": "ObjectId",
    "role": "admin"
}

DELETE /api/sessions/users/:uid = Elimina un usuario del sistema

GET /api/sessions/current = Obtiene la información del usuario actualmente autenticado



//            PRODUCTOS

POST /api/products = Crear un nuevo producto

GET	/api/products = Obtener todos los productos

GET /api/products/:pid = Obtener un producto por ID

PUT	/api/products/:pid = Actualizar un producto por ID

DELETE	/api/products/:pid = Eliminar un producto por ID

//            CARRITOS

POST /api/carts = Crear un nuevo carrito

GET	/api/carts/:cid = Obtener un carrito por ID

POST /api/carts/:cid/products/:pid = Agregar un producto al carrito

DELETE	/api/carts/:cid/products/:pid = Eliminar un producto del carrito

PUT	/api/carts/:cid = Actualizar el carrito completo

PUT	/api/carts/:cid/products/:pid = Actualizar la cantidad de un producto

DELETE	/api/carts/:cid = Vaciar el carrito


//////     PRODUCTOS      /////////

A continuación se detallan los endpoints relacionados con los productos en la aplicación, junto con su uso y ejemplos de solicitudes y respuestas.

1. Crear un nuevo producto

Endpoint: POST /api/products

Descripción: Crea un nuevo producto o actualiza el stock de un producto existente.

Cuerpo de la solicitud:

{
    "title": "Product Name",
    "description": "Product Description",
    "code": "PRODUCT123",
    "price": 100.00,
    "stock": 50,
    "category": "Category Name",
    "thumbnails": ["url1", "url2"]
}

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": [
        {
            "_id": "66741c87e3f650caca73d183",
            "title": "Product Name",
            "description": "Product Description",
            "code": "PRODUCT123",
            "price": 100.00,
            "stock": 50,
            "category": "Category Name",
            "thumbnails": ["url1", "url2"],
            "status": true,
            "createdAt": "2024-06-24T00:51:16.310Z",
            "__v": 0
        }
    ]
}

2. Obtener todos los productos

Endpoint: GET /api/products

Descripción: Obtiene una lista de todos los productos con paginación, filtros y ordenamiento.

Parámetros de consulta:

- limit: Número de productos por página (por defecto: 10).

- page: Número de la página (por defecto: 1).

- sort: Ordenar por precio (asc o desc).

- category: Filtrar por categoría.

- available: Filtrar por disponibilidad (true o false).

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": [
        {
            "_id": "66741c87e3f650caca73d183",
            "title": "Product Name 1",
            "description": "Product Description 1",
            "code": "PRODUCT123",
            "price": 100.00,
            "stock": 50,
            "category": "Category Name",
            "thumbnails": ["url1", "url2"],
            "status": true,
            "createdAt": "2024-06-24T00:51:16.310Z",
            "__v": 0
        }
    ],
    "totalPages": 1,
    "prevPage": null,
    "nextPage": null,
    "page": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevLink": null,
    "nextLink": null
}

3. Obtener un producto por ID

Endpoint: GET /api/products/:pid

Descripción: Obtiene un producto específico por su ID.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "66741c87e3f650caca73d183",
        "title": "Product Name",
        "description": "Product Description",
        "code": "PRODUCT123",
        "price": 100.00,
        "stock": 50,
        "category": "Category Name",
        "thumbnails": ["url1", "url2"],
        "status": true,
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 0
    }
}

4. Actualizar un producto por ID

Endpoint: PUT /api/products/:pid

Descripción: Actualiza un producto específico por su ID.

Cuerpo de la solicitud:

{
    "title": "Updated Product Name",
    "description": "Updated Product Description",
    "code": "PRODUCT123",
    "price": 150.00,
    "stock": 40,
    "category": "Updated Category",
    "thumbnails": ["url1", "url2"]
}

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "66741c87e3f650caca73d183",
        "title": "Updated Product Name",
        "description": "Updated Product Description",
        "code": "PRODUCT123",
        "price": 150.00,
        "stock": 40,
        "category": "Updated Category",
        "thumbnails": ["url1", "url2"],
        "status": true,
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}

5. Eliminar un producto por ID

Endpoint: DELETE /api/products/:pid

Descripción: Elimina un producto específico por su ID.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "message": "Producto eliminado exitosamente"
}


//////     CARRITOS      /////////

1. Crear un nuevo carrito

Endpoint: POST /api/carts

Descripción: Crea un nuevo carrito con una lista de productos.

Cuerpo de la solicitud:

{
    "products": [
        {
            "productId": "66741c87e3f650caca73d183",
            "quantity": 2
        },
        {
            "productId": "66741c87e3f650caca73d1b7",
            "quantity": 1
        },
        {
            "productId": "66741c87e3f650caca73d1a7",
            "quantity": 5
        }
    ]
}

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 2
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            },
            {
                "productId": "66741c87e3f650caca73d1a7",
                "quantity": 5
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 0
    }
}

2. Obtener un carrito por ID

Endpoint: GET /api/carts/:cid

Descripción: Obtiene un carrito específico por su ID.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 2
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            },
            {
                "productId": "66741c87e3f650caca73d1a7",
                "quantity": 5
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 0
    }
}

3. Agregar un producto al carrito

Endpoint: POST /api/carts/:cid/products/:pid

Descripción: Agrega un producto específico al carrito. Si el producto ya está en el carrito, incrementa su cantidad.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 2
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            },
            {
                "productId": "66741c87e3f650caca73d1a7",
                "quantity": 5
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}

4. Eliminar un producto del carrito

Endpoint: DELETE /api/carts/:cid/products/:pid

Descripción: Elimina un producto específico del carrito.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 2
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}

5. Actualizar el carrito completo

Endpoint: PUT /api/carts/:cid

Descripción: Reemplaza todos los productos en el carrito con una nueva lista de productos.

Cuerpo de la solicitud:

{
    "products": [
        {
            "productId": "66741c87e3f650caca73d183",
            "quantity": 4
        },
        {
            "productId": "66741c87e3f650caca73d1b7",
            "quantity": 3
        }
    ]
}

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 4
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 3
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}

6. Actualizar la cantidad de un producto en el carrito

Endpoint: PUT /api/carts/:cid/products/:pid

Descripción: Actualiza la cantidad de un producto específico en el carrito.

Cuerpo de la solicitud:

{
    "quantity": 10
}

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [
            {
                "productId": "66741c87e3f650caca73d183",
                "quantity": 10
            },
            {
                "productId": "66741c87e3f650caca73d1b7",
                "quantity": 1
            }
        ],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}

7. Vaciar el carrito
Endpoint: DELETE /api/carts/:cid

Descripción: Elimina todos los productos del carrito, dejándolo vacío.

Ejemplo de respuesta exitosa:

{
    "status": "success",
    "payload": {
        "_id": "6678c304adca6260cf4c7a19",
        "products": [],
        "createdAt": "2024-06-24T00:51:16.310Z",
        "__v": 1
    }
}