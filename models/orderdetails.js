const mongoose = require('mongoose');

var OrderDetailsSchema = new mongoose.Schema({
    oId : String,
    pId : String,
    quantity: Number,
    cost: Number,
    orderId: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Order"
        }
    ],
    productId: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
});

var OrderDetails = mongoose.model('OrderDetail', OrderDetailsSchema);

module.exports = OrderDetails;
