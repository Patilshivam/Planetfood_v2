#   Schemas

    * Employee (employee id, employee name, job, salary)
    * Users (user id, user name, employee id, password, usertype)
    * Categories (categoty id, categoty name)
    * Products (product id, category id, product name, product price, active)
    * Orders (order id, order date, gst, gst amount, discount, grand total, userid, order amount)
    * Order Details (order id, product id, quantity, cost)

#   seed.js

    * Admin can add all specific gst, discount details for a particular day

#   User Auth

    * passport, passport-local, passport-local-mongoose, express-session
    * routes  /register, /login, /logout
    * Middleware to hide data if not logged in

#   Authentication main points
    
    * Only Admin can Create Read Update Delete { Employee, Products, User Registration, Employee Registration}.

    * Cashier can only Make Order, View Order, and View All order details.

# Technology Used

* MongoDB : Database{BackEnd}
* Express/EJS/HTML/CSS/JS : FrontEnd
* NodeJS : Server Side Code

# App Features

* if login as ADMIN
    * Create, Read, Update, Delete Employee
    * Create, Read, Update, Delete Products
    * Create, Read, Update Categories
    * Register User with userid and password and that userid and password handover to employee
    * Create Orders, Read Orders by Date, Read all Orders
    * Read OrderDetails for report purpose
* if login as CASHIER
    * Create Orders, Read Orders by Date, Read all Orders
    * Read OrderDetails for report purpose
    
    NOTE : with out login ADMIN and CASHIER can not do anything.
    
    
# What i learn from Planetfood Version-2

    * How to approach project.
    * How to make relationship between collections/tables.   
    * How to make user friendly UI.
    * USER Autentication using passportJS, passport-local, passport-local-mongoose.
    * Use some ES6 features like arrow function, String template, require etc.
    * Really implement DRY principle.
    * Rapid Development ASAP.
    * I don't like UI stuff, This app allow me to explore Bootstrap 4, Gliphicons, Font-Awesome etc.
