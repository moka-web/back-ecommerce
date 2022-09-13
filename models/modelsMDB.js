
const mongoose = require('mongoose')


const productSchema= new mongoose.Schema({
    name:{ type: String, required: true, max: 100 },
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    thumbnail:{type:String,required:true},
    description: {type: String, require: true},
    timestamp:{type:String,require:false},
    id_prod:{type:Number,required:true},
})


module.exports =  mongoose.model('products',productSchema)
