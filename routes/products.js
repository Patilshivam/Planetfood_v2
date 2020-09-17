const   express     = require('express'),
        Products    = require("../models/products"),
        Category    = require("../models/categories"),
        user        = require('../models/user'),
        router      = express.Router();

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();  
}); 

function isLoggedInAsAdmin(req, res, next){
    //console.log(req.isAuthenticated());
    //console.log(req.user.usertype);    
    if(req.isAuthenticated() && (req.user.usertype === 'Admin')){
        return next();
    }
    res.redirect("/logout");
}

router.get('/', isLoggedInAsAdmin, (req, res) => {
    res.render('products/products');    
});

router.get('/productslist', isLoggedInAsAdmin,(req, res) => {
    Products.find({}, (err, products) => {
        if(err) {
            console.log("something went wrong");
        }
        res.render('products/productslist', {products : products});
    });
});

router.get('/addproduct', isLoggedInAsAdmin,(req, res) => {
    Category.find({}, (err, categories) => {
        if(err) {
            console.log("Something went wrong");
        } else { 
            res.render('products/addproduct', { categories: categories });    
        }
    });    
});

router.post('/addproduct', isLoggedInAsAdmin,(req, res) => {
    //console.log(req.body.product);
    Products.create(req.body.product, (err, product) => {
        if(err){
            console.log("something went wrong");
        } else {
            res.redirect('/products/productslist');
        }
    });
});

router.get("/:id/edit", isLoggedInAsAdmin,(req, res) => {
    //console.log(req.params.id);
    Products.findOne({_id : req.params.id}, (err, product) => {
        if(err){
            console.log("Something went wrong");
        } else {
            //console.log(product);
            Category.find({}, (err, category) => {
                if(err){
                    console.log("something went wrong");
                } else {
                    res.render("products/editproduct", {product : product, category : category});
                }
            });
            
        }
    });
});

router.put("/:id", isLoggedInAsAdmin,(req, res) => {
    //console.log(req.body.product);
    //console.log(req.params.id);
    Products.findByIdAndUpdate(req.params.id, req.body.product, (err, product) => {
        if(err){
            console.log("something went wrong", err);
        } else {
            res.redirect('/products/productslist');
        }    
    });
}); 

router.get("/:id", isLoggedInAsAdmin,(req, res) => {
    Products.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log("something went wrong");
        } else {
            res.redirect('/products/productslist');
        }
    });
});

router.get('/:id/view', isLoggedInAsAdmin,(req, res) => {
    //console.log(req.params.id);
    Products.findOne({_id : req.params.id}, (err, product) => {
        if(err) {
            console.log('something went wrong', err);
        } else {
            res.render('products/product', { product : product });
        }
    });
});

module.exports = router;