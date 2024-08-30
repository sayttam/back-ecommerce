import auth from '../middleware/auth.middleware.mjs';
import express from 'express';
import CartRepository from '../repository/cart.repository.mjs';
import ProductRepository from '../repository/product.repository.mjs';
import TicketModel from '../persistence/mongoDB/models/ticket.model.mjs';
import authorization from '../middleware/authorization.middleware.mjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

router.post('/', auth, authorization(["user"]), async (req, res) => {
    try {
        const newCart = await cartRepository.createCart({products: []});
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create cart' });
    }
});

router.post('/:cid/purchase', auth, authorization(["user"]), async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartRepository.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        let totalAmount = 0;
        const purchasedProducts = [];
        const failedProducts = [];

        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.productId);

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                purchasedProducts.push(item.productId);
                await productRepository.updateProduct(product.id, { stock: product.stock });
            } else {
                failedProducts.push(item.productId);
            }
        }

        let ticket;

        if (purchasedProducts.length > 0) {
                ticket = new TicketModel({
                code: uuidv4(),
                amount: totalAmount,
                purchaser: req.user.email,
                products: purchasedProducts
            });
            await ticket.save();
        }

        const updatedCart = {
            ...cart,
            products: cart.products.filter(item => failedProducts.includes(item.productId))
        };
        await cartRepository.updateCart(cartId, updatedCart);

        res.json({ purchasedProducts, failedProducts, ticket});

    } catch (error) {
        res.status(500).json({ error: 'Failed to complete purchase' });
    }
});

router.post('/:cid/products', auth, authorization(["user"]), async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { productId, quantity } = req.body;

        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productInCart = cart.products.find(item => item.productId.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cartRepository.updateCart(cartId, cart);

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

router.get('/', auth, authorization(["admin"]), async (req, res) => {
    try {
        const carts = await cartRepository.getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const cartId = req.params.id;
        const deletedCart = await cartRepository.deleteCart(cartId);
        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete cart' });
    }
});


router.get('/:id', auth, async (req, res) => {
    try {
        const cart = await cartRepository.getCartById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

export default router;