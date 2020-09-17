const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    passportLocalMongoose = require('passport-local-mongoose'),
    LocalStrategy = require('passport-local');

const categoriesRoutes = require('./routes/categories'),
    productsRoutes = require('./routes/products'),
    employeeRoutes = require('./routes/employees'),
    orderRoutes = require('./routes/orders'),
    orderDetailRoutes = require('./routes/orderdetails'),
    userRoutes = require('./routes/user'),
    index = require('./routes/index');

const User = require('./models/user');    

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/planetfood', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));

// Include Express Session
app.use(require('express-session')({
    secret : 'Planetfood app version 2 using MEN',
    resave : false,
    saveUninitialized : false
}));

// Authentication Part
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.use('/', index);
app.use('/categories', categoriesRoutes);
app.use('/products', productsRoutes);
app.use('/employees', employeeRoutes);
app.use('/orders', orderRoutes);
app.use('/orderdetails', orderDetailRoutes);
app.use('/', userRoutes);

const server = app.listen('3000', () => {
    console.log(`Server started at port ${server.address().port}`);
});
