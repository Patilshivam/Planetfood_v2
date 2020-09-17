const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    userName : String,
    password : String,
    usertype : String,
    employeeId : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Employee"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);