
import CartDAO from '../persistence/mongoDB/cart.dao.mjs';

class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getAllCarts() {
        return await this.cartDAO.getAllCarts();
    }

    async getCartById(id) {
        return await this.cartDAO.getCartById(id);
    }

    async createCart(cartData) {
        return await this.cartDAO.createCart(cartData);
    }

    async updateCart(id, updateData) {
        return await this.cartDAO.updateCart(id, updateData);
    }

    async deleteCart(id) {
        return await this.cartDAO.deleteCart(id);
    }
}

export default CartRepository;
