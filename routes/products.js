const express = require('express');
const fs = require('fs');
const path = require('path');
const generateId = require('../idGenerator/idGenerator');

const router = express.Router();
const productsFilePath = path.join(__dirname, '../data/products.json');

const leerProductos = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const escribirProductos = (productos) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));
};

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
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || price === undefined || stock === undefined || !category) {
        return res.status(400).send('Todos los campos son obligatorios excepto thumbnails.');
    }

    const productos = leerProductos();
    const productoExistente = productos.find(p => p.code === code || p.title === title);

    if (productoExistente) {
        res.status(403).json("El producto con el codigo " + productoExistente.code + " o el titulo " + productoExistente.title + " ya existe, actualicelo con el id: " + productoExistente.id + ". Si esta cargando un producto nuevo, utilice otro nombre u otro codigo para crearlo");
    } else {
        const nuevoProducto = {
            id: generateId(),
            title,
            description,
            code,
            price,
            status: req.body.status !== undefined ? req.body.status : true,
            stock,
            category,
            thumbnails: thumbnails || []
        };
        productos.push(nuevoProducto);
        escribirProductos(productos);
        res.status(201).json(nuevoProducto);
    }
});

router.put('/:pid', (req, res) => {
    const productos = leerProductos();
    const indiceProducto = productos.findIndex(p => p.id === req.params.pid);
    if (indiceProducto !== -1) {
        const productoActualizado = { ...productos[indiceProducto], ...req.body, id: productos[indiceProducto].id };
        productos[indiceProducto] = productoActualizado;
        escribirProductos(productos);
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.delete('/:pid', (req, res) => {
    let productos = leerProductos();
    const indiceProducto = productos.findIndex(p => p.id === req.params.pid);
    if (indiceProducto !== -1) {
        productos = productos.filter(p => p.id !== req.params.pid);
        escribirProductos(productos);
        res.status(200).send("Producto eliminado correctamente");
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;