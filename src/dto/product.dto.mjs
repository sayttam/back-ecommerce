
class ProductDTO {
    constructor({ _id, name, description, price, stock }) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}

export default ProductDTO;
