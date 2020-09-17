const express = require('express'),
      router = express.Router(),
      orderData = require('../seed');

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();  
});      

router.get('/',isLoggedIn, (req, res) => {
    //console.log(req.user);
    res.render('index');
});
 
router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");        
}

module.exports = router;      