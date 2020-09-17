const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    catId : String,
    catName: String
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;