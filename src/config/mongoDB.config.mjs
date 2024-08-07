import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
    mongoose.connect(process.env.MONGO_DB)
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('No se puede conectar a MongoDB...', err));
    } catch (error) {
        console.log(error);
    }
};