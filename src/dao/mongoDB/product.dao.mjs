import { productModel } from "./models/product.model.mjs";

const getAll = async (query) => {
    return await productModel.find(query);
};

const getOne = async (query) => {
    return await productModel.findOne(query);
};

const  create = async (data) => {
    return await productModel.create(data);
};

const update = async (id, data) => {
    return await productModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
    return await productModel.findByIdAndDelete(id);
};

export default { getAll, getOne, create, update, deleteOne };