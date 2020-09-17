const   express     = require('express'),
        user        = require('../models/user'),
        Employee    = require('../models/employee'),
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

router.get("/", isLoggedInAsAdmin, (req, res)=> {
    res.render("employees/employees");
});       

router.get("/addemployee", isLoggedInAsAdmin, (req, res) => {
    res.render('employees/addemployee');
});

router.post("/addemployee", isLoggedInAsAdmin,(req, res) => {
    Employee.create(req.body.employee, (err, employee) => {
        if(err) {
            console.log('something went wrong');
        } else {
            res.redirect('/employees/employeeslist');
        }
    });
});

router.get("/employeeslist", isLoggedInAsAdmin,(req, res) => {
    Employee.find({}, (err, employees) => {
        if(err){
            console.log('something went wrong');
        } else {
            res.render('employees/employeeslist', {employees : employees})
        }
    });
});

router.get("/:id/edit", isLoggedInAsAdmin,(req, res) => {
    Employee.findOne({_id : req.params.id}, (err, employee) => {
        if(err){
            console.log('something went wrong');
        } else {
            res.render('employees/editemployee', {employee : employee});
        }
    });
});

router.put("/:id", isLoggedInAsAdmin,(req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body.employee, (err)=> {
        if(err){
            console.log('something went wrong');
        } else {
            res.redirect('/employees/employeeslist');
        }
    });
});

router.get("/:id", isLoggedInAsAdmin,(req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log('something went wrong');
        } else {
            res.redirect('/employees/employeeslist');
        }
    })
});

router.get("/:id/view", (req, res) => {
    Employee.findOne({_id : req.params.id}, (err, employee) => {
        if(err){
            console.log('something went wrong');
        } else {
            res.render('employees/employee', {employee : employee});
        }
    });
});

module.exports = router;