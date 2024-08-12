import { createContext, useState } from "react";
import { Storage } from "../storage";

export const UserContext = createContext();

export const UserProvider = (props) => {
    let users = localStorage.getItem("users");

    if(!users){
        users = Storage.users;
        localStorage.setItem("users",JSON.stringify(users));
    }
    else{
        users = JSON.parse(users);
    }

    const [iUser, setIUser] = useState()
    const userLogin = (_email,_password) => {
        let tempUser = users.find(item => item.email == _email && item.password == _password);
        if(tempUser){
            setIUser((prv) =>  _email);
            return true;
        }
        else{

            setIUser((prv) =>  {  return undefined });

        }
        return false;
    } 

    const userRegister = (_name,_email,_password) => {
        console.log({ name: _name, email: _email, password: _password });
        let tempUser = users.find(item => item.email == _email);
        if(tempUser){
            return false;
        }
        
        users.push({ name: _name, email: _email, password: _password });
        localStorage.setItem("users",JSON.stringify(users));
        return true;
    }
    return(
        <UserContext.Provider value={{iUser, userLogin, userRegister}}>{props.children}</UserContext.Provider>
    );
}