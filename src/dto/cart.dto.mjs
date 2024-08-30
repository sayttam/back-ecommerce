
class CartDTO {
    constructor({ _id, userId, products }) {
        this.id = _id;
        this.userId = userId;
        this.products = products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
        }));
    }
}

export default CartDTO;
