const http = require('./app');
require('dotenv').config();
const productos = require('./clase')

let productosaGuardar = JSON.stringify([{
    title: "guitarra",
    price: 123.45,
    thumbnail: "https://images.app.goo.gl/EhRq8oJRvHcMLtBt6",
    id: 1},
    {
    title: "piano",
    price: 234.56,
    thumbnail: "https://images.app.goo.gl/NPmngiEvBVmZAsXA8",
    id: 2}
])

const db = new productos('./src/services/products.txt')
db.save(productosaGuardar);
console.log(db.getProducts())

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.info(`Server up and running in port: ${PORT}`));

