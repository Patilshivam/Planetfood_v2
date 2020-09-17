var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated() && (currentUser.usertype === 'Admin')){
        return next();
    }
    // req.flash("error", "You need to logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;