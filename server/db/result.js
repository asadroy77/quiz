let mongoose = require('mongoose');


let resultSchema = mongoose.Schema({
    id:String,
    user_id:String,
    total_marks:Number,
    type_key:String,
    result: Number,
    date : { type: Date, default: Date.now },
    percentage:Number
    
});

let ResultAPP = mongoose.model('ResultAPP', resultSchema);
module.exports = ResultAPP;