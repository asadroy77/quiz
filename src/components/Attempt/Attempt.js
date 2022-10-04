import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from "../../store/store";


const Attempt = () => {

    let params = useParams()
    const [data, setData] = useState({})
    const [inputFields, setInputFields] = useState([])
    const [question, setQuestion] = useState("")
    const [index, setIndex] = useState(0)
    const [checkedState, setCheckedState] = useState([]) 
    


    let reducer = useSelector((store)=>{
        return store.userReducer;
    })

    let user_id = reducer.currentUser._id
    console.log(user_id )


    
useEffect(() => {

    const fetchkr = async () => {
        try {
            let questions = await axios.get('/get_questions?id=' + params.id)
            setData(questions.data)
            console.log(questions.data)
            setInputFields(questions.data.questions[index].answers)
            setQuestion(questions.data.questions[index].question_key)
            } catch (error) {
            console.log(error)
            }
        }
        fetchkr()
}, [])


const changekro = (id) => {
        
        if(checkedState.includes(id)){
            let result = checkedState
            let remainingArr = result.filter(data => data != id)
            setCheckedState(remainingArr)
        }else{
            setCheckedState([...checkedState,id])
        }}

const get_Result = async() =>{

   
    try {
        let resp = await axios.post('/attempted_quiz',{data:data,user_id:user_id});
         console.log(resp)
       } catch (error) {
         console.log(error)
       }
       
    }

    const submit = (e) => {
        e.preventDefault();
        // let final_edit = [{...data[index], attempted_ans:checkedState }]
        // console.log(final_edit)
        let questions = data.questions.map((item,ind)=>{
            if(ind==index){
                item.attempted_ans=checkedState
            }
           return  item  })
        setData({...data,questions})
        console.log(data)
        setCheckedState([])
        if (index+1 < data.questions.length){
            setInputFields(data.questions[index+1].answers) 
            setQuestion(data.questions[index+1].question_key)
            setIndex(index + 1)
        }
        else{
            console.log(index)
        }

    }


    return (<>
        <form onSubmit={submit}>
            <input name='question' placeholder='please enter your question'
                defaultValue={question} />
            {inputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <p  >{input.answer}</p>
                        <input checked={checkedState.includes(input._id)} type="checkbox" name="status" value={input._id} 
                        onChange={() =>changekro(input._id)} />
                    </div>
                )
            })}

            <button onClick={submit}>Submit & Go Next</button>
        </form>

        <button onClick={get_Result}>Done</button>
    </>
    )
}

export default Attempt