const mongoose = require('mongoose');

var OrdersSchema = new mongoose.Schema({
    orderId: String,
    orderDate: { type: Date, default: Date.now },
    gst: Number,
    gstAmount: Number,
    discount: Number,
    gtotal: Number,
    userName : String,
    orderAmount: Number,
});

var Orders = mongoose.model('Order', OrdersSchema);

module.exports = Orders;
