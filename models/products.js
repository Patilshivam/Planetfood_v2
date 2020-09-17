const mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({
    productId : String,
    productName : String,
    productPrice : Number,
    active : String,
    image: { type: String, default: '/images/product.png' },
    category : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category"
        }
    ]
});

var Products = mongoose.model('Product', ProductsSchema);

module.exports = Products;