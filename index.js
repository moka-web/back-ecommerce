const express = require('express');
const routerProducts = require('./routes/productsRouter')

const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let isAdmin = true;

if (isAdmin) {

    app.use('/api/productos' , routerProducts)
    
} else{
    console.log('no tiene permisos')
}




const server = app.listen(PORT , () => console.log(`servidor Levantado ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))