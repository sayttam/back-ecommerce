import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
    mongoose.connect('mongodb+srv://admin:123@proyectocoder-mjb.vxoxal7.mongodb.net')
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('No se puede conectar a MongoDB...', err));
    } catch (error) {
        console.log(error);
    }
};