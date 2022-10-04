import { createStore, combineReducers } from "redux";

let initialData = {
    currentUser:null,
    users:[],
    state:"loading"
}

function userReducer(olData = initialData, newData){
   
    if(newData.type == "User_ADDED"){
        olData.users.push(newData.payload);
    }else if(newData.type == "USER_UPDATED"){

        olData.users[newData.someINdex]  = newData.newUser;
    
    }else if(newData.type == "USER_LOGGED_IN"){
        olData.currentUser = newData.payload;
        olData.state = "loaded";
        
    }else if(newData.type == "USER_LOGGED_OUT"){
        localStorage.removeItem("someToken");
        olData.currentUser = null;
        
    }else if(newData.type == "session_failed"){
        localStorage.removeItem("someToken");
        olData.state = "session_failed";
        
    }

    

    return {...olData};

}



let bigREducer = combineReducers({userReducer,});


let meraStore = createStore(bigREducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default meraStore;