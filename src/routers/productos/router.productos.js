const express = require('express');
const routers = express.Router();
const Container = require('../../../clase')
const productosDb = new Container('products.txt')

routers.get('/', async (_req, res, next) => {
    try{
        const data = await JSON.parse(productosDb.getProducts())
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({error: 'no se encuentra producto! '})
        }
    }catch(err){
        next(err)
    }
})

routers.get('/:id',async(req, res, next) => {
    try{
        const { id } = req.params
        const dbParse = JSON.parse(productosDb.getProducts())
        const thisProduct = dbParse.find(i => i.id == id)
        if(thisProduct){
            res.status(200).json(thisProduct)
        }
        if(id){
            res.status(200).json({
                success: 'True',
                producto: thisProduct
            })
        }
    }catch(err){
        next(err)
    }
})

routers.post('/', async (req, res, next) => {
    try {
        const { body } = req
        const nuevaLista = await productosDb.addProduct(body);
        if(nuevaLista) {
            res.status(200).json({
                success: 'True',
                data: nuevaLista
            })
        } else {
            res.status(404).json({error: 'no se pudo agregar'})
        }
    }catch(err){
        next(err)
    }

})

routers.delete('/:id', async (req, res, next) =>{
    const { id } = req.params
    try{
        let data = await productosDb.deletebyId(id);
        if(data){
            res.status(200).json({
                succes: 'True',
                response: 'product deleted'
            })
        }
    }catch(err){
        next(err)
    }
})

module.exports = routers