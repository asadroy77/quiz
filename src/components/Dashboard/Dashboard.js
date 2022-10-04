import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


const Dashboard = () => {
  let [questionstate,setQuestionstate] = useState([])
  let params = useParams()
  useEffect( ()=>{
    const fetchkr = async()=>{
          try {
          let questions = await axios.get('/get_questions?id='+params.id)
          setQuestionstate(questions.data.questions)
          console.log(questions.data.questions)             
          } catch (error) {
          console.log(error)} 
      }
    fetchkr()
},[])

  
  return (<>
  <h1>these are the questions</h1>
  <table>
    <tbody>
  {questionstate.map((item,index)=>{
    return (<tr key={index+item._id}>
      <td>{item.question_key}</td>
      <td><button onClick={async()=>{

let resp = await axios.delete('/deletekro?q_id='+ item._id +"&id="+ params.id ,  { data: { answer: 42 } });
console.log(resp.data)
if(resp.data.success){
  questionstate.splice(index,1)
  setQuestionstate([...questionstate])
}}}>Delete</button>
</td>

<td><Link to={"/edit/"+item._id+"/"+params.id}><button>edit</button></Link></td>
</tr>
  )}
  )}
  </tbody>
  </table>
  </>
  )
}

export default Dashboard