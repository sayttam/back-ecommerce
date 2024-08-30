
import ProductDAO from '../persistence/mongoDB/product.dao.mjs';

class ProductRepository {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async getAllProducts() {
        return await this.productDAO.getAllProducts();
    }

    async getProductById(id) {
        return await this.productDAO.getProductById(id);
    }

    async createProduct(productData) {
        return await this.productDAO.createProduct(productData);
    }

    async updateProduct(id, updateData) {
        return await this.productDAO.updateProduct(id, updateData);
    }

    async deleteProduct(id) {
        return await this.productDAO.deleteProduct(id);
    }
}

export default ProductRepository;
