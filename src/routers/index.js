const express = require('express');
const routers = express.Router();
const middlewareError = require('../middleware/middleware.error')
const productosRouter = require('./productos/router.productos')

routers.use('/health', (_req, res, next) => {
    try{
        res.status(200).json({
            succes:'True',
            health: 'Up',
            environment: process.env.environment || "no found"
        })
    }catch(err){
        next(err)
    }
})
.use('/productos', productosRouter)

module.exports = routers