import { Router } from 'express';
import Product from '../persistence/mongoDB/models/product.model.mjs';
import Cart from '../persistence/mongoDB/models/cart.model.mjs';

const router = Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { productos: products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await Product.find({});
    res.render('realTimeProducts', { productos: products });
});

router.get('/products', async (req, res) => {
    let { limit = 10, page = 1, sort, category, available } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    let filters = {};
    if (category) filters.category = category;
    if (available) filters.status = available === 'true';

    const options = {
        page,
        limit,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
    };

    const result = await Product.paginate(filters, options);
    res.render('index', {
        products: result.docs,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
    });
});

router.get('/products/:pid', async (req, res) => {
    const product = await Product.findById(req.params.pid);
    if (product) {
        res.render('productDetails', { product });
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.get('/carts/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.productId');
    if (cart) {
        res.render('cart', { cart });
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

export default router;