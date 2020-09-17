const   express     = require('express'),
        Category    = require("../models/categories"),
        router      = express.Router(),
        user        = require('../models/user');

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();  
}); 

function isLoggedInAsAdmin(req, res, next){
    // console.log(req.isAuthenticated());
    // console.log(typeof(req.user.usertype));
    // console.log(typeof('Admin'));
    // console.log((req.user.usertype == 'Admin'));
    if(req.isAuthenticated() && (req.user.usertype == 'Admin')){
        return next();
    }
    res.redirect("/logout");
}

router.get('/', isLoggedInAsAdmin, (req, res) => {
    res.render('categories/categories');
});

router.get("/categorylist", isLoggedInAsAdmin, (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) 
            console.log("Something went wrong");
        res.render('categories/categorylist', { categories: categories });    
    });
});

router.get("/addcategory", isLoggedInAsAdmin, (req, res) => {
    res.render("categories/addcategory");
});

router.post("/addcategory", isLoggedInAsAdmin, (req, res) => {
    console.log(req.body.categories);
    Category.create(req.body.categories, (err, category) => {
        if(err) {
            console.log('something went wrong', err);
        } else {
            res.redirect('/categories/categorylist');
        }
    });
});

router.get("/:id/edit", isLoggedInAsAdmin, (req, res) => {
    Category.findOne({_id : req.params.id}, (err, category) => {
        if(err) {
            console.log('something went wrong');
        } else {
            res.render("categories/editcategory", { category : category });
        }
    });
});

router.put("/:id", isLoggedInAsAdmin, (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body.categories, (err) => {
        if(err) {
            console.log('something went wrong');
        } else {
            res.redirect('/categories/categorylist');
        }
    });
});

module.exports = router;