import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import store from "../../store/store";

// 
// 
//wre


const Result = () => {
    let [data,setData] = useState([]);
    
    let reducer = useSelector((store)=>{
      return store.userReducer;
  })

  let user_id = reducer.currentUser._id
  console.log(user_id)


    useEffect(()=>{
        const content = async()=>{
            let res = await axios.get('/fetch_result?user_id='+user_id)
            console.log(res.data) 
            setData(res.data)
         }
        content();
},[])
  return (<>
    {data.map((item,index)=>{
     return( 
    <div key={index}>
       <p>{item.type_key + " " + item.percentage }%</p>
    </div>   )  

})}
    
</>
  )}

export default Result