const express = require('express');
const fs = require('fs');
const path = require('path');
const generateId = require('../idGenerator/idGenerator');

const router = express.Router();
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const productsFilePath = path.join(__dirname, '../data/products.json');

const leerCarritos = () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

const escribirCarritos = (carritos) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carritos, null, 2));
};

const leerProductos = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

router.post('/', (req, res) => {
    const carritos = leerCarritos();
    const nuevoCarrito = {
        id: generateId(),
        productos: []
    };
    carritos.push(nuevoCarrito);
    escribirCarritos(carritos);
    res.status(201).json(nuevoCarrito);
});

router.get('/:cid', (req, res) => {
    const carritos = leerCarritos();
    const carrito = carritos.find(c => c.id === req.params.cid);
    if (carrito) {
        res.json(carrito.productos);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const carritos = leerCarritos();
    const indiceCarrito = carritos.findIndex(c => c.id === req.params.cid);
    if (indiceCarrito !== -1) {
        const carrito = carritos[indiceCarrito];
        const producto = leerProductos().find(p => p.id === req.params.pid);
        if (producto) {
            const indiceProducto = carrito.productos.findIndex(p => p.producto === req.params.pid);
            if (indiceProducto !== -1) {
                carrito.productos[indiceProducto].cantidad += 1;
            } else {
                carrito.productos.push({ producto: req.params.pid, cantidad: 1 });
            }
            escribirCarritos(carritos);
            res.json(carrito);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

module.exports = router;