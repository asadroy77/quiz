let mongoose = require('mongoose');


let quizSchema = mongoose.Schema({
    questions:[{answers:[{ answer: String, status: Boolean }],question_key: String ,type_key: String}],
    subject: String
});

let quizapp = mongoose.model('QuizAPP', quizSchema);
module.exports = quizapp;

//schema for quiz 1 ads