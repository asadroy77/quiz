import React, { useEffect, useState } from 'react';
import "./MAIN.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import store from '../../store/store'
export const MAIN = () => {

  //
  let[mydata ,setMydata] = useState([])

  useEffect(()=>{
    const content = async()=>{
    let quiz_types = await axios.get('/fetch_types') 

    let result = quiz_types.data.map((item,index)=>{
    return {subject :item.subject, _id:item._id} })
  
    // function onlyUnique(value, index, self) {
    //   return self.indexOf(value) === index;
    // }
    // var unique = result.filter(onlyUnique);
    setMydata(result)
  
  }
    content();
  },[])

  const logout = () =>{

    store.dispatch({
      type:"USER_LOGGED_OUT"
    })

  }


  return (<>

  <div className='buttonwrap'>
   <Link className='mainbutton' to='/addquiz'>ADD QUIZ </Link>
   {/* <Link className='mainbutton' to={'/student'}>Attempt quiz</Link> */}
   <button className='mainbutton' onClick={logout}> Log Out</button>
  </div>
 <div className='maincontentent'>
  {mydata.map((item,index)=>{
    return <div key={index}>
      <Link className='mainbutton' to = { "/dashboard/" + item._id }>{item.subject}</Link>
    </div>

  })
  }

 </div>
  
 
 
 </>)}
