
import CartModel from './models/cart.model.mjs';
import CartDTO from '../../dto/cart.dto.mjs';

class CartDAO {
    async getAllCarts() {
        const carts = await CartModel.find({});
        return carts.map(cart => new CartDTO(cart));
    }

    async getCartById(id) {
        const cart = await CartModel.findById(id);
        return new CartDTO(cart);
    }

    async createCart(cartData) {
        const newCart = new CartModel(cartData);
        const savedCart = await newCart.save();
        return new CartDTO(savedCart);
    }

    async updateCart(id, updateData) {
        const updatedCart = await CartModel.findByIdAndUpdate(id, updateData, { new: true });
        return new CartDTO(updatedCart);
    }

    async deleteCart(id) {
        const deletedCart = await CartModel.findByIdAndDelete(id);
        return new CartDTO(deletedCart);
    }
}

export default CartDAO;
