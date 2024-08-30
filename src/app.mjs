import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import { connectMongoDB } from './config/mongoDB.config.mjs';
import productosRouter from './routes/products.routes.mjs';
import userRouter from './routes/user.routes.mjs';
import carritosRouter from './routes/carts.routes.mjs';
import viewsRouter from './routes/views.routes.mjs';
import cookiesRouter from './routes/cookies.routes.mjs';
import Handlebars from 'handlebars';
import { engine } from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import cookieParser from 'cookie-parser';
import passport from './config/passport.config.mjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

await connectMongoDB();

const hbs = create({ extname: '.handlebars' });

app.engine('handlebars', engine({ handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.SECRET_KEY));


app.use(passport.initialize());
app.use('/api/sessions', userRouter);
app.use('/api/products', productosRouter);
app.use('/api/carts', carritosRouter);
app.use('/cookies', cookiesRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit('productos', leerProductos());
    socket.on('nuevoProducto', async (producto) => {
        const newProduct = new Product(producto);
        await newProduct.save();
        const productos = await Product.find({});
        io.emit('productos', productos);
    });
});
