const socket = io()

socket.on('HEALTH', data => {
    alert(data.health)
})

let messages = []
let products = []

// PRODUCTOS

function addProduct(){
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    const objectoProduct = {
        title,
        price,
        thumbnail
    } 
    console.info(objectoProduct)
    socket.emit('NEW_PRODUCT', objectoProduct)
}

function updateProduct(data){
    let productToList = ""
    data.forEach( i => {
        productToList = productToList + `<li>${i.title} ${i.price} ${i.thumbnail}</li>`
    })
    document.querySelector('#productList').innerHTML = productToList
}

socket.on('LIST_PRODUCTS', data => {
    products.push(data)
    updateProduct(data)
})

// MENSAJES

function sendNewMessage(){
    const message = document.querySelector('#message').value;
    const username = document.querySelector('#username').value;
    if(!message || !username){
        alert('No hay datos!')
        return
    }
    const messajeObject = {
        username,
        message
    }
    socket.emit('NEW_MESSAGE', messajeObject)
    document.querySelector('#message').value = ''
}

function updateData(data){
    let messageToList = ""
    const dateNow =  `- ${new Date().toLocaleDateString()} - (${new Date().getHours()}:${new Date().getMinutes()} hs)`
    data.forEach(i => {
        messageToList = messageToList + `<li>user:${i.username}${dateNow} user: ${i.message}</li>`
    })
    document.querySelector('#messageList').innerHTML = messageToList
}

socket.on('UPDATE_DATA', data => {
    messages.push(data)
    updateData(data)
})

socket.on('NEW_MESSAGE_FROM_SERVER', data => {
    messages.push(data)
    updateData(data)
})
