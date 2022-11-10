const fs = require('fs')
const express = require('express');
const router = express.Router();
const lista = require('../../clase')

router.get('/', async (_req,res,next) => {
    try{
        const data = await lista.getProducts()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try{
        const listado = await JSON.parse(fs.readFileSync('./products.txt'))
        const { id } = req.params
        const thisProduct = listado.find(i => i.id == id);
        if(id){
            res.status(200).json({
                succes: "true",
                data: thisProduct
            })
        }else {
            res.status(404).json({
                succes: 'false',
                error: 'producto no encontrado! '
            })
        }
    }catch(err){
        next(err)
    }

})

module.exports = router;