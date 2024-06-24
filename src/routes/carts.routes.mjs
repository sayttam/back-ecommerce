import { Router } from 'express';
import Cart from '../dao/mongoDB/models/cart.model.mjs';
import Product from '../dao/mongoDB/models/product.model.mjs';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar una lista de productos' });
        }

        for (let item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ status: 'error', message: `Producto con id ${item.productId} no encontrado` });
            }
        }

        const newCart = new Cart({ products });
        await newCart.save();

        res.status(201).json({ status: 'success', payload: newCart });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate({
            path: 'products.productId',
            strictPopulate: false
        });
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', payload: cart.products });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const product = await Product.findById(req.params.pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        const productInCart = cart.products.find(p => p.productId.toString() === req.params.pid);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ productId: req.params.pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.pid);
        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        res.json({ status: 'success', payload: cart });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


router.put('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        cart.products = req.body.products;
        await cart.save();

        res.json({ status: 'success', payload: cart });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const productInCart = cart.products.find(p => p.productId.toString() === req.params.pid);
        if (productInCart) {
            productInCart.quantity = req.body.quantity;
            await cart.save();
            return res.json({ status: 'success', payload: cart });
        } else {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        cart.products = [];
        await cart.save();

        res.json({ status: 'success', payload: cart });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

export default router;