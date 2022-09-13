const mongoose = require('mongoose');
const productSchema = require('../models/modelsMDB');

class Product {

    async connectMdb () {
        try {
            return await mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });
          } catch (e) {
            console.log(e);
          }
    }

    
    async save (object){
        try {
        const db = await this.connectMdb();
        let time = new Date();
        object.timestamp = time.toString(); 
        await productSchema.products.create(object);
        console.log('producto guardado')    

        } catch (error) {
            throw error(error.message)
        }

    
    }
    //funca Rey
    async getAll (){
        try {
            const db = await this.connectMdb();
            if (!db) throw 'can not connect to the db';
            //console.log(db);
            const products = productSchema.find({})
            //console.log(products)
            return products
        } catch (error) {
            console.error(error.message)
            
        }

    }


    async getById (id){
        try {
            const db = await this.connectMdb();
            if (!db) throw 'can not connect to the db';
            const product_id= productSchema.findById(id)
            return product_id;
        } catch (error) {
            console.error(error.message)
            
        }
    }

   
}

module.exports = Product;