const express = require('express');
const fs = require('fs');
const path = require('path');
const generateId = require('../idGenerator/idGenerator');
const { io } = require('../app');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../data/products.json');

const leerProductos = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const escribirProductos = (productos) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));
};

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('nuevoProducto', (data) => {
        const productos = leerProductos();
        const { title, price } = data;
        const nuevoProducto = {
            id: generateId(),
            title,
            description: '',
            code: '',
            price,
            status: true,
            stock: 0,
            category: '',
            thumbnails: []
        };
        productos.push(nuevoProducto);
        escribirProductos(productos);
        io.emit('productos', productos);
    });

    socket.on('eliminarProducto', (data) => {
        let productos = leerProductos();
        productos = productos.filter(p => p.title !== data.title);
        escribirProductos(productos);
        io.emit('productos', productos);
    });
});

router.get('/', (req, res) => {
    const productos = leerProductos();
    const limite = parseInt(req.query.limit) || productos.length;
    res.json(productos.slice(0, limite));
});

router.get('/:pid', (req, res) => {
    const productos = leerProductos();
    const producto = productos.find(p => p.id === req.params.pid);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.post('/', (req, res) => {
    const productos = leerProductos();
    const { title, description, code, price, stock, category, status = true, thumbnails = [] } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send('Todos los campos son obligatorios, excepto thumbnails');
    }

    const nuevoProducto = {
        id: generateId(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    const productoExistente = productos.find(p => p.code === code || p.title === title);
    if (productoExistente) {
        return res.status(400).send('El producto con el mismo código o título ya existe');
    }

    productos.push(nuevoProducto);
    escribirProductos(productos);
    io.emit('productos', productos);
    res.status(201).json(nuevoProducto);
});

router.put('/:pid', (req, res) => {
    const productos = leerProductos();
    const indiceProducto = productos.findIndex(p => p.id === req.params.pid);

    if (indiceProducto !== -1) {
        const productoActualizado = { ...productos[indiceProducto], ...req.body, id: productos[indiceProducto].id };
        productos[indiceProducto] = productoActualizado;
        escribirProductos(productos);
        io.emit('productos', productos); 
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.delete('/:pid', (req, res) => {
    let productos = leerProductos();
    const productoIndex = productos.findIndex(p => p.id === req.params.pid);
    if (productoIndex !== -1) {
        productos = productos.filter(p => p.id !== req.params.pid);
        escribirProductos(productos);
        io.emit('productos', productos);  
        res.status(204).send();
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;