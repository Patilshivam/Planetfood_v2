const express = require('express'),
    router = express.Router(),
    Orders = require('../models/orders'),
    Products = require('../models/products'),
    OrderDetails = require('../models/orderdetails'),
    orderData = require('../seed');
   
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();  
}); 

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");        
}

router.get('/makeorder',isLoggedIn, (req, res) => {
    Products.find({ active : 'Y' }, (err, products) => {
        if (err) {
            console.log('something went wrong');
        } else {
            res.render('orders/makeorder', { products: products });
        }
    });
});

var orderList = []; 

router.post('/placeorder',isLoggedIn, (req, res) => {
    //console.log(req.body.selectedProductId);
    Products.findOne({ _id : req.body.selectedProductId }, (err, product) => {
        if(err) {
            console.log('something went wrong');
        } else {
            //console.log(product);
            var order = {
                pId : product.productId,
                selectedProductId : req.body.selectedProductId,
                productName :  product.productName,
                productPrice : product.productPrice,
                quantity : req.body.quantity
            }
            //console.log(orderData);
            orderData.gtotal += req.body.quantity * product.productPrice;
            orderData.gstamount = orderData.gtotal * (orderData.gst / 100);
            orderData.ordertotal = (orderData.gtotal + orderData.gstamount) - orderData.gtotal * (orderData.discount / 100);
            
            var flag = false;
            orderList.forEach(od =>{
                if(od.selectedProductId === order.selectedProductId) {
                    console.log(typeof(order.quantity));
                    console.log(typeof(od.quantity));
                    od.quantity = parseInt(od.quantity) + parseInt(order.quantity);
                    flag = true;
                } 
            });
            if(!flag) {
                orderList.push(order);
            }
            console.log(orderList);
            res.render('orders/placeorder', { orderList : orderList, orderData : orderData});
        }
    });
});

router.post('/finalOrderPlace',isLoggedIn, (req, res) => {
    //console.log(req.body.order);
    Orders.create({
        orderId : req.body.orderId,
        gst : req.body.gst,
        gstAmount : req.body.gstAmount,
        discount : req.body.discount,
        gtotal : req.body.gtotal,
        userName : req.user.username,
        orderAmount : req.body.orderAmount
    }, (err, order) => {
        if(err) {
            console.log('something went wrong');
        } else {
            console.log(`order placed ${order}`);

            orderList.forEach(od => {
                OrderDetails.create({
                    oId : order.orderId,
                    pId : od.pId,
                    quantity : od.quantity,
                    cost : (parseInt(od.productPrice) * parseInt(od.quantity)),  
                    orderId : order._id,
                    productId : od.selectedProductId
                    
                }, (err, orderDetils) => {
                    if(err) {
                        console.log('something went wrong');
                    } else {
                        //console.log(`order details added ${orderDetils}`);
                        //res.redirect('/');
                    }
                });
            });
            res.redirect('/');
        }
    });
});

router.get('/datewise',isLoggedIn, (req, res) => {
    res.render('orders/datewiseorder');
});

router.post('/datewise',isLoggedIn, (req, res) => {
    console.log(`Start date ${req.body.start}`);
    console.log(`End date ${req.body.end}`);
    Orders.find({"orderDate" : {"$gte": new Date(req.body.start), "$lt" : new Date(req.body.end) }}, (err, orders) => {
        if(err) {
            console.log('something went wrong', err);
        } else {
            console.log(orders);
            res.render('orders/vieworder', { orders : orders });
        }
    });
});

router.get('/vieworder',isLoggedIn, (req, res) => {
    Orders.find({}, (err, orders) => {
        if(err){
            console.log('something went wrong');
        } else {
            res.render('orders/vieworder', {orders : orders});
        }
    });
});

module.exports = router;
