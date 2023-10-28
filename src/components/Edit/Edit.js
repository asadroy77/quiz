import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';


const Edit = () => {
    let param = useParams();
    let [editquestion ,setEditquestion]=useState({});
    const [inputFields, setInputFields] = useState([])
    const[question,setQuestion] = useState("");
    // edit question

useEffect(()=>{
    const find_question = async()=>{
    let singlequestion = await axios.get("/single_question?question_id="+param.id+"&upid="+param.upid )
    console.log(singlequestion.data)
    setEditquestion(singlequestion.data)
    setInputFields(singlequestion.data.answers)
    setQuestion(singlequestion.data.question_key)
}
find_question();

},[param.id])


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
    let newfield = { answer: '',status: false }
  
    setInputFields([...inputFields, newfield])
  }
  
  const submit = async (e) => {
    e.preventDefault();
    let finaldata = {question_key:question,answers:[...inputFields]}
    let final_edit = {...editquestion,...finaldata}
    console.log(final_edit)
    
    try {
     let resp = await axios.put('/update_question?upid='+ param.upid,final_edit);
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
    
    // resetform();
    
  }
  
  
  const resetform = () =>{
    setInputFields([{answer:'', status:false}]);
    setQuestion("");
     
  }
const delete_answer = (index) =>{
  let answers = [...inputFields]
  answers.splice(index,1)
  setInputFields(answers)


}  

  
//   const p_status= totaldata.length > 0 ? false : true 
  
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
                <input type="checkbox" name="status" checked={input.status}
                 
                onChange={e=>changekro(index,e)}/>
                <button onClick={()=>delete_answer(index)}>Delete answer</button>
               </div>
            )
          })}
  
        <button onClick={submit}>Submit</button>
        </form>
        <button onClick={addFields}>Add More</button>
  
        {/* <p hidden={p_status}><span style={{marginLeft:"15px",backgroundColor:"red"}}>{totaldata.length} </span> questions added ,please add next question</p> */}
    
    </>
    )
  
    
    
  
    }


export default Edit