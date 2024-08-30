
import express from 'express';
import ProductRepository from '../repository/product.repository.mjs';
import authorization from '../middleware/authorization.middleware.mjs';
import auth from '../middleware/auth.middleware.mjs';

const router = express.Router();
const productRepository = new ProductRepository();


router.post('/', auth, authorization(['admin']), async (req, res) => {
    try {
        const product = await productRepository.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

router.put('/:id', auth, authorization(['admin']), async (req, res) => {
    try {
        const updatedProduct = await productRepository.updateProduct(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.delete('/:id', auth, authorization(['admin']), async (req, res) => {
    try {
        await productRepository.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await productRepository.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productRepository.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

export default router;
