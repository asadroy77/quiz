import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Student.css" ;
import store from '../../store/store'
const Student = () => {
    let[data ,setdata] = useState([])

    useEffect(()=>{
      const content = async()=>{
      // let quiz_types = await axios.get('/fetch_types') 
  
      // let result = quiz_types.data.map((item,index)=>{
      //   return item.type_key
      // })
      let quiz_types = await axios.get('/fetch_types') 

      let result = quiz_types.data.map((item,index)=>{
      return {subject :item.subject, _id:item._id} })
    
      // function onlyUnique(value, index, self) {
      //   return self.indexOf(value) === index;
      // }
      
      // var unique = result.filter(onlyUnique);
      setdata(result)
    
    }
      content();
    },[])


    const logout = () =>{

      store.dispatch({
        type:"USER_LOGGED_OUT"
      })
  
    }
   
  return (<> <button className='mainbutton' onClick={logout}>Log out</button>
  
   <Link className='mainbutton' to={'/get_Result'}>Get Result</Link>

  {data.map((item,index)=>{
    return <div key={index} >
    <Link className='mainbutton' to={"/attempt/"+ item._id }>{item.subject}</Link>
    </div>
  })}
  
  </>
  )
}

export default Student