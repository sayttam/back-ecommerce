const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const productosRouter = require('./routes/products');
const carritosRouter = require('./routes/carts');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const hbs = create({ extname: '.handlebars' });

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productosRouter);
app.use('/api/carts', carritosRouter);

app.get('/', (req, res) => {
    res.render('home', { productos: leerProductos() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos: leerProductos() });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { io };