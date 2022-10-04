
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    type:String, 
    name:String,
    password:String,
    email:String    
});

let User =  mongoose.model('abc', userSchema);
module.exports = User