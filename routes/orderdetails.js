const express = require('express'),
    router = express.Router(),
    OrderDetails = require('../models/orderdetails');

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

router.get('/vieworderdetails',isLoggedIn, (req, res) => {
    OrderDetails.find({}, (err, orderdetails) => {
        if(err){
            console.log('something went wrong');
        } else {
            res.render('orderdetails/vieworderdetails', { orderdetails : orderdetails });
        }
    });
});    

module.exports = router;