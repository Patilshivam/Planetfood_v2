#   Database

#   Employee (employee id, employee name, job, salary)
#   Users (user id, user name, employee id, password, usertype)

#   Categories (categoty id, categoty name)
#   Products (product id, category id, product name, product price, active)

#   Orders (order id, order date, gst, gst amount, discount, grand total, userid, order amount)
#   Order Details (order id, product id, quantity, cost)

#   job bole tho => admin, cashier

#   Note about seed.js => Admin can add all specific gst, discount details for a particular day

#   User Auth

#   1. passport, passport-local, passport-local-mongoose, express-session
#   2. /register
#   3. /login
#   4. /logout
#   5. middleware to hide data if not logged in

#   Authentication main points
    
    * Only Admin can Create Read Update Delete { Employee, Products, User Registration, Employee Registration}

    * Cashier can only Make Order, View Order, and View All order details

#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#