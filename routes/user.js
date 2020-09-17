const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    Employee = require('../models/employee');


function isLoggedInAsAdmin(req, res, next){
    //console.log(req.isAuthenticated());
    //console.log(req.user.usertype)
    if(req.isAuthenticated() && (req.user.usertype === 'Admin')){
        return next();
    }
    ;
    res.redirect("/logout");
}

router.get('/register', isLoggedInAsAdmin,(req, res)=> {
    Employee.find({}, (err, employees) => {
        if(err) {
            console.log('something went wrong');
        } else {
            res.render('register', { employees : employees });
        }
    });
});

router.post('/register', isLoggedInAsAdmin,(req, res) => {
    Employee.findOne({_id:req.body.employeeId}, (err, employee) => {
        if(err){
            console.log('something went wrong');
        } else {
            console.log(employee);
            User.register(new User({username : req.body.username, usertype : employee.job, employeeId : req.body.employeeId}), req.body.password, (err, user) => {
                if(err) {
                    console.log('something went wrong');
                    res.render('register');
                } else {
                    // passport.authenticate('local') (req, res, () => {
                    //     res.redirect('/');
                    // });
                    console.log('user register successfully');
                    res.redirect('/');
                }
            });
        }
    });
    //res.send('Register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login'
}) , (req, res) => {

});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;