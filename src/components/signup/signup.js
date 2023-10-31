import React from 'react';
import {useRef} from "react";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    let navigate = useNavigate();
    
    let data = useForm();

    async function saveUser(meraData){

        // let form = new FormData();        
        // form.append("name",meraData.name)
        // form.append("email",meraData.email)
        // form.append("password",meraData.password)
        // form.append("type",meraData.type)
        

        // meraData.file = meraData.file[0]

        // store.dispatch({
        //     type:"User_ADDED",
        //     payload:meraData
        // });

        // console.log(form)

        console.log(meraData);    
          

        try{
            let resp = await axios.post('/signup-karo', meraData);
            
        }
        catch(e){
            console.log(e);
        }

        // axios.put('/signup-karo', meraData);
        // get aur delete m data nahi jyega
        // data.reset()
        navigate('/login')

       
    
    }


  return (<> <div>



  
<form onSubmit={data.handleSubmit( saveUser  )}>
            <div>
             <label>name</label>
            <input {...data.register('name', {required:true})} />
            </div>
            {data.formState.errors.name && <div className="error">name btyen</div>}
            
            <div>
            <label>email</label>
                <input {...data.register('email', {required:true})} />
            </div>
            {data.formState.errors.email && <div className="error">email btyen</div>}
            <div>
            <label>password</label>
            <input {...data.register('password', {required:true})}/>
            </div>
            {data.formState.errors.password && data.formState.errors.password.type == "required" && <div className="error">password btyen</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "minLength" &&<div className="error">password ki min length 6 h</div>}
            {data.formState.errors.password && data.formState.errors.password.type == "validate" &&<div className="error">Aik capital letter bhi type kren</div>}
            
        <select {...data.register("type", { required: true })}>
        <option value="admin">admin </option>
        <option value="student"> student</option>
        </select>

        <button>Submit</button>
        </form>

    </div>

  
  
  </>
  )
}

export default Signup