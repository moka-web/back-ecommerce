const express = require('express')
const productDaos = require('../daos/productDaos.js')

const routerProducts = express.Router();


routerProducts.get('/', async (req,res) =>{

const prod = new productDaos()

    try {
        const productos = await prod.getAll()
        res.status(200).send({
            status: 200,
            data: {
                ...productos,
            },
            message:'productos encontrados'
            })
    }
        
    catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }



});

routerProducts.get('/:id', async (req,res) =>{

    const prod = new productDaos()
    const id = req.params.id;
        try {
            const product_id = await prod.getById()

            res.status(200).send({
                status: 200,
                data: {
                    product_id,
                },
                message:'producto encontrado'
                })
        }
            
        catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    
    
    
    });






// routerProducts.post();

// routerProducts.put();

// routerProducts.delete();



module.exports = routerProducts;