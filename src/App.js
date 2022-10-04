import './App.css';
import {MAIN} from './components/main/MAIN';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import {Addquiz} from './components/Addquiz/Addquiz'
import { useState } from 'react';
import { useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Edit from './components/Edit/Edit';
import MultiForm from "./components/form/Form";
import Student from './components/student/Student';
import Attempt from './components/Attempt/Attempt';
import Result from './components/Result/Result';
import Homepage from './components/homepage/Homepage';
import Signup from "./components/signup/signup";
import Login from './components/login/Login';
import store from './store/store'
import axios from 'axios';
import { useSelector } from 'react-redux';
 import { Provider } from 'react-redux';
function App() {

const[totaldata,setTotaldata] = useState({});

useEffect( ()=>{

  async function sessionkaro(){

    
     let resp = await axios.get('/session-check-karo?tk='+localStorage.getItem("someToken"))

     if(resp.data){
      store.dispatch({
        type:"USER_LOGGED_IN",
        payload:resp.data
    });

     }else{
      
      store.dispatch({
        type:"session_failed"            
    });
     }
    
  }

sessionkaro();

}, [])


  return (<>
  <Provider store={store}>
  <BrowserRouter>
  <Routes>  
  <Route path="/" element={<Homepage></Homepage>}></Route>
  <Route path='/signup' element={<Signup></Signup>}></Route>
  <Route path='/login' element={<Login></Login>}></Route>
  <Route path="/main" element={<MAIN></MAIN>}></Route>
  <Route path='/addquiz' element={<MultiForm/>}></Route>
  <Route path="/dashboard/:id" element={<Dashboard></Dashboard>}></Route>
  <Route path='/edit/:id/:upid' element={<Edit></Edit>}></Route>
  <Route path='/student' element={<Student></Student>}></Route>
  <Route path="/attempt/:id" element={<Attempt></Attempt>}></Route>
  <Route path='/get_Result' element={<Result></Result>}></Route>
 </Routes>
 </BrowserRouter>
 </Provider>
</>
);
}

export default App;
