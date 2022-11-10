const fs = require('fs')

module.exports = class Container {
    constructor(archivo) {
        this.archivo = archivo
    }

    async save(arr){
        try{
            await fs.promises.writeFile(this.archivo, arr)
        }catch(err){
            console.error(err)
        }
    }

    getProducts(){
        try{
            const data = fs.readFileSync(this.archivo,"utf-8")
            return data
        }catch(err){
            console.error(err)
        }
    }

    async addNewProduct(price, title, thumbnail){
        try{
            let listaProductos = await fs.promises.readFile(this.archivo,'utf-8')
            listaProductos = JSON.parse(listaProductos)
            const productObject = {price, title, thumbnail}
            listaProductos.push(productObject)
            listaProductos = JSON.stringify(listaProductos)

            await fs.promises.writeFile(this.archivo, listaProductos)

        }catch(err){
            console.error(err)
        }
    }

    async addMessage(nuevoProducto){
        try {
            await fs.promises.appendFile(this.archivo, JSON.stringify(nuevoProducto))
        } catch(err) {
            console.error(err)
        }
    }

    async deletebyId(idABorrar){
        try{
            let listaProductos = await JSON.parse(await fs.promises.readFile(this.archivo, 'utf-8'))

            const indexProductoABorrar = listaProductos.findIndex(producto => producto.id == idABorrar);
            listaProductos.splice(indexProductoABorrar, 1);

            listaProductos = JSON.stringify(listaProductos)
            
            return await fs.promises.writeFile(this.archivo, listaProductos)
        }catch(err){
            console.error(err)
        }
    }
}

