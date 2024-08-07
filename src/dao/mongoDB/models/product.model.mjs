import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productsCollection, productSchema);

export default Product;