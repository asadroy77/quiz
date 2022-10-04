import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Homepage = () => {

    let reducer = useSelector((store)=>{
        return store.userReducer;
    })

  return (<>
    <div>Homepage</div>
    <div><Link to={"/signup"}>Sign Up</Link><Link to={"/login"}>Login In</Link></div>
    {reducer.state == "loaded" ? 
    localStorage.getItem('someToken')&&reducer.currentUser.type == "admin" ? 
    <Navigate to={"/main"}></Navigate>
    :reducer.currentUser.type == "student"  ?
    <Navigate  to="/student" /> 
    : reducer.state == "session_failed" ?   
    <Navigate  to="/login" /> 
    : null:null}
</>)
}

export default Homepage