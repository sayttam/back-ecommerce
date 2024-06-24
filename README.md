# back-ecommerce

Este proyecto fue creado con Node.js y Express para curso de backend de Coderhouse

Resumen de Endpoints
POST /api/carts = Crear un nuevo carrito
GET	/api/carts/:cid = Obtener un carrito por ID
POST /api/carts/:cid/products/:pid = Agregar un producto al carrito
DELETE	/api/carts/:cid/products/:pid = Eliminar un producto del carrito
PUT	/api/carts/:cid = Actualizar el carrito completo
PUT	/api/carts/:cid/products/:pid = Actualizar la cantidad de un producto
DELETE	/api/carts/:cid = Vaciar el carrito

////// CARRITOS /////////

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