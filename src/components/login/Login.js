import React from 'react';
import axios from "axios";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  store from '../../store/store';

const Login = () => {

  let navigate = useNavigate();

  let nameRef = useRef();
  let passwordRef = useRef();

  // let users = useSelector(function(store){
  //     return store.userReducer.users;
  // });

 async function loginUser(){

      let milgyUser = await axios.post('/login', {
          name:nameRef.current.value,
          password:passwordRef.current.value
      })

  //   let milgyUser =   users.find((user)=>{

  //         if(user.name == nameRef.current.value && user.password == passwordRef.current.value){
  //             return true;
  //         }

  //     });

      console.log(typeof(milgyUser.data.meraUser.type))

      if(milgyUser.data){

          localStorage.setItem("someToken", milgyUser.data.token);

          store.dispatch({
              type:"USER_LOGGED_IN",
              payload:milgyUser.data.meraUser
          });

          if(milgyUser.data.meraUser.type === "admin" ){
            navigate('/main');
          }else{
              navigate('/student');
          }

        // navigate('/')

          // props.setLoginHogya(true);


          console.log("milgya user");
      }else{
          console.log("user nahi mila")
          // alert("nahi milgya user");
      }
   
  }

  return (<div>

        <div>
            <input ref={nameRef} />
        </div>

        <div>
            <input ref={passwordRef}/>
        </div>

        
        <button onClick={loginUser}>Submit</button>

    </div>

  )
}

export default Login