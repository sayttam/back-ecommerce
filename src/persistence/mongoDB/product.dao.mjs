
import ProductModel from './models/product.model.mjs';
import ProductDTO from '../../dto/product.dto.mjs';

class ProductDAO {
    async getAllProducts() {
        const products = await ProductModel.find({});
        return products.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await ProductModel.findById(id);
        return new ProductDTO(product);
    }

    async createProduct(productData) {
        const newProduct = new ProductModel(productData);
        const savedProduct = await newProduct.save();
        return new ProductDTO(savedProduct);
    }

    async updateProduct(id, updateData) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        return new ProductDTO(deletedProduct);
    }
}

export default ProductDAO;
