import { Router } from 'express';
import Product from '../dao/mongoDB/models/product.model.mjs';
import express from 'express';
//import generateId from '../idgenerator/idgenerator.js';
import { Server } from 'socket.io';
import http from 'http';

const router = Router();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, category, available } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        if (isNaN(limit) || limit <= 0) {
            limit = 10;  
        }
        if (isNaN(page) || page <= 0) {
            page = 1; 
        }

        sort = sort !== 'undefined' ? sort : undefined;

        let filters = {};
        if (category && category !== 'undefined') {
            filters.category = category;
        }
        if (available && available !== 'undefined') {
            filters.status = available === 'true';
        }

        const options = {
            page,
            limit,
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };

        const result = await Product.paginate(filters, options);

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&category=${category}&available=${available}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&category=${category}&available=${available}` : null
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const products = Array.isArray(req.body) ? req.body : [req.body];

        const newProducts = [];

        for (let productData of products) {
            const { title, description, code, price, stock, category, thumbnails, id } = productData;

            if (!title || !description || !code || !price || !stock || !category) {
                return res.status(400).json({ status: 'error', message: 'Todos los campos son requeridos, excepto thumbnails' });
            }

            const existingProduct = await Product.findOne({ $or: [{ code }, { title }] });
            if (existingProduct) {
                existingProduct.stock += stock;
                await existingProduct.save();
                newProducts.push(existingProduct);
                continue;
            }

            const newProduct = new Product({
                id,
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                thumbnails: thumbnails || []
            });

            await newProduct.save();
            newProduct.id = newProduct._id;
            await newProduct.save();
            newProducts.push(newProduct);
        }

        res.status(201).json({ status: 'success', payload: newProducts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (product) {
            res.status(200).json({ status: 'success', payload: product });
        } else {
            res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;

        const product = await Product.findByIdAndUpdate(pid, updateData, { new: true });

        if (product) {
            res.status(200).json({ status: 'success', payload: product });
        } else {
            res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await Product.findByIdAndDelete(pid);

        if (product) {
            res.status(204).send();
        } else {
            res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

export default router;