let express = require('express');
let mongoose = require('mongoose');
const jsonwebtoken = require("jsonwebtoken");
let app = express();

app.use(express.json());

let quiz  = require('./db/quiz')
let User = require('./db/user')
let MyResult = require('./db/result')

mongoose.connect('mongodb://localhost:27017/quizDB', (err, connection) => {
    console.log(err || connection);
})

app.post('/signup-karo', (req, res)=>{
        //user added
  let nyaUser = new User(req.body);

  nyaUser.save();
  
  console.log(req.body);
  res.json({
      success:true
  })
})


app.post('/login', async (req, res)=>{

  let user =  await User.findOne(req.body);

           if(user){

           jsonwebtoken.sign({
               id:user._id
           },"token created", {
               expiresIn:"2h"
           }, (err, meraToken)=>{


               res.json({
                   token:meraToken,
                   meraUser:user
               });



           })

       }else{
           res.json(null);
       }


});

app.get('/session-check-karo', async (req, res)=>{

  try{

      let data = await jsonwebtoken.verify(req.query.tk, "token created")

      let user = await User.findById(data.id);

      // let user = users.find(user=>user.id == data.id);
      
      res.json(user);
  }catch(e){
      res.json(null);
  }

  


});





app.post('/addq', async(req, res) => {
// add quiz question .
    let newquiz = new quiz(req.body);

    await newquiz.save();

    res.json({
        success: true
    })
})

app.put('/addq-withexistingsubject',async(req,res)=>{
    await quiz.findOneAndUpdate({ _id : req.query.id},{$push:{questions:req.body}})
     
    res.json({
        success: true
    })
    
})



app.get('/get_questions',async(req, res)=>{
   //get questions
    let ques = await quiz.findById({_id:req.query.id})
    res.json(ques)
})


app.get('/fetch_types' , async (req,res)=>{
    let alldata = await quiz.find({})
    res.json(alldata)
})


app.delete('/deletekro',async(req,res)=>{
console.log(req.query.q_id)  , console.log(req.query.id)
// console.log(req.body)
quiz.findById(req.query.id, function(err, result) {
    if (!err) {
      if (!result){
        res.status(404).send('User was not found');
      }
      else{
        console.log(result)
        result.questions.id(req.query.q_id).remove(function(removeerr, removresult) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        // result.markModified('posts'); 
        result.save(function(saveerr, saveresult) {
          if (!saveerr) {
            res.json({success:true});
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });

// await quiz.save(function (err) {
//     if (err) return handleError(err);
//     console.log('the subdocs were removed');
//   });


 
})

app.get("/single_question" , async(req,res)=>{
    
  quiz.findById(req.query.upid, function(err,result){
   let final =  result.questions.id(req.query.question_id) 
    res.json(final)
  })
   
})

app.put('/update_question', async (req, res)=>{
  quiz.findById(req.query.upid, function(err, result) {
    if (!err) {
      if (!result){
        res.status(404).send('User was not found');
      }
      else{
        result.questions.id(req.body._id).question_key = req.body.question_key
        result.questions.id(req.body._id).answers = req.body.answers
        // result.posts.id(req.body._id).text = req.body.text;
        // result.markModified('posts'); 
        result.save(function(saveerr, saveresult) {
          if (!saveerr) {
            res.status(200).send(saveresult);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });

    // try{

    //     await quiz.findByIdAndUpdate(req.body._id, req.body);
        
    //     res.json({
    //         success:true
    //     })
    // }catch(e){
    //     res.json(e);
    // }

})


app.post('/attempted_quiz', async(req, res) => {
  
    let total_marks = req.body.data.questions.length
    let result = req.body.data.questions.map(element => {
        let scored = 0
        let weightage = 1 / element.answers.filter(item=>item.status).length
        element.answers.forEach((answer)=>{
            if( element.attempted_ans.includes(answer._id ) && answer.status == true){
           scored += weightage
            }

        })

       return scored;   
    });

    let total_marks_obt = result.reduce((a,b)=>{
        return a+b
    })
    let percentage = (total_marks_obt/total_marks)*100


    let newResult = new MyResult({id:req.body.user_id,total_marks:total_marks ,type_key:req.body.data.subject ,result:total_marks_obt,percentage:percentage});

    await newResult.save()

    res.json({
        success: true
    })
})

app.get('/fetch_result' , async(req,res)=>{
  let result = await MyResult.find({id:req.query.user_id})
  res.json(result)
})



let PORT = 2000;

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})