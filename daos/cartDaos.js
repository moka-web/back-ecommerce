const admin = require('firebase-admin');
const config = require('../firebaseDb/cart-test-ecommerce-firebase-adminsdk-dlio0-0c63a15fce.json');
const productDaos = require('./productDaos')

const product = new productDaos()

class Cart {

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(config)
          });
    }

    async newCart (){
      const db = admin.firestore();
      let timestamp = new Date();
      try {

        const carts = await db.collection('carritos').doc().create(
        {
            timestamp: timestamp,
            products:[]
        }
        );
        
        return carts

      } catch (error) {
       
         throw Error(error.message)

      }
    };

    async getCartById(id){
        const db = admin.firestore();
        try {
            const cart= db.collection('carritos').doc(String(id))
            const selectedCart= await cart.get();

            return selectedCart

        } catch (error) {
            throw Error(error.message)
        }
    }

    async addProductToCart(idcart,idproduct){
        const db = admin.firestore();

        try {


            let mongoProduct = await product.getById(idproduct) 
            const cart =db.collection('carritos').doc(String(idcart))

            let charge = cart.update(
                {
                    products:admin.firestore.FieldValue.arrayUnion(String(mongoProduct))
                }
            )

        } catch (error) {
            console.log(error.message)
        }

    }

    async deleteCart(id){
        const db = admin.firestore();
        try {
            let cart = db.collection('carritos').doc(String(id));
            let deleteCart= cart.delete()

        } catch (error) {
            console.log(error.message)
            
        }
    }

    async deleteCartProduct(cartId,idproduct){
        const db= admin.firestore();
        try {

            let mongoProduct = await product.getById(idproduct)
            let cart= db.collection('carritos').doc(String(cartId))

            let deleteProduct = cart.update(
                {products: admin.firestore.FieldValue.arrayRemove(String(mongoProduct))}
            )

        } catch (error) {
            console.log(error.message)
        }





    }





}

module.exports= Cart;