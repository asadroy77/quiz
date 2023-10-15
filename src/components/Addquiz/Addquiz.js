import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';

export const Addquiz = ({type,setType}) => {

const [inputFields, setInputFields] = useState([{answer:'',status: false}])
const[question,setQuestion] = useState("");


const resetform = () =>{
  setInputFields([{answer:'', status:false }]);
  setQuestion("");
  setType({});
}

// handle change 1

const handleFormChange = (index, event) => {
  let data = [...inputFields]
  data[index][event.target.name] = event.target.value
  setInputFields(data)
}

const changekro = (index,e) =>{
  let data1 = [...inputFields]
  data1[index][e.target.name] = !data1[index][e.target.name]
  setInputFields(data1)
}

const addFields = () => {
  // add new field
  let newfield = { answer: '',status: false }

  setInputFields([...inputFields, newfield])
}

const submit = async (e) => {
  e.preventDefault();
  if(type._id){
    let finaldata = {question_key:question,type_key:type.subject ,answers:[...inputFields]}
    console.log(finaldata)
    try {
      let resp = await axios.put('/addq-withexistingsubject?id='+ type._id ,finaldata)
      console.log(resp)
      } catch (error) {
      console.log(error)
      }

  }
  
  else{
   let finaldata = { questions:[{question_key:question,type_key:type.subject ,answers:[...inputFields]}],
   subject:type.subject } 
  try {
  let resp = await axios.post('/addq',finaldata)
  console.log(resp)
  } catch (error) {
  console.log(error)
  }

}
  //reset form after submit
  resetform();
  
}

return (<> 
      <form onSubmit={submit}>
        <input name='question' placeholder='please enter your question' 
        value={question} onChange={e=>setQuestion(e.target.value)}/>
       
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name='answer'
                placeholder='Please enter your answer'
                value={input.answer}
                onChange={event => handleFormChange(index, event)}/>
              <input type="checkbox" name="status" 
              checked={input.status}
              value={input.status} 
              onChange={e=>changekro(index,e)}/>
             </div>
          )
        })}

      <button onClick={submit}>Submit</button>
      </form>
      <button onClick={addFields}>Add More</button>

  </>
  )
}
