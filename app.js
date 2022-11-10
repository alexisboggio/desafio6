const express = require('express');
require('dotenv').config()
const middlewareError = require('./src/middleware/middleware.error');
const indexRouters = require('./src/routers/index');
const bodyParser = require('body-parser')
const app = express();
const Products = require('./clase')

app.use('/static', express.static('views'))
app.set('views','./views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));

app.use('/api',indexRouters);
app.use(middlewareError)

app.get('/',(_req,res,next) => {
    try{
        const products = new Products('./src/services/products.txt')
        const listaParseada = JSON.parse(products.getProducts())
        res.render('post.productos.ejs',{product: listaParseada})
    }catch(err){
        next(err)
    }

})

app.post('/productos', (req,_res,next) => {
    try{
        const {title, price, thumbnail} = req.body
        const products = new Products('./src/services/products.txt')
        products.addNewProduct(title,price,thumbnail)
    }catch(err){
        next(err)
    }
})

// Services

let messages = []
let productos = []

//socket config


const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');

const http = new HttpServer(app);
const io = new IoServer(http);

io.on('connection', socket => {
    console.info('nuevo cliente id:', socket.id)
    socket.emit('HEALTH', {health: process.env.health})
    socket.emit('UPDATE_DATA', messages)
    socket.on('NEW_MESSAGE', data => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', messages)
        const db = new Products('./src/services/messages.txt')
        db.addMessage(messages)
    })
    socket.on('NEW_PRODUCT', data => {
        productos.push(data)
        socket.emit('LIST_PRODUCTS', productos)
        const db = new Products('./src/services/products.txt')
        db.addNewProduct(data)
        
    } )
})

module.exports = http