import Grid from '@mui/material/Grid'; // Grid version 1
import Item from '@mui/material/MenuItem'; // Grid version 1
import TextField from "@mui/material/TextField";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material-next/Button";
import { ChangeEvent,useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../../data/context/userContext";
import {useNavigate} from "react-router-dom";
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {iUser, userLogin} = useContext(UserContext);
  let [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    switch(e.target.id){
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const callLogin = () => {

    if(!email.match(validRegex) || password.length < 8){
      setErrors("");
      return ;
    }

    let success = userLogin(email,password);
    
    if(success){
      setErrors("");

      navigate("/post");
    }
    else{
      setErrors("Invalid Credentials");
    }
  }
   
  return (
    <>

        <h1>Login</h1>
        <Grid container spacing={2}>
            <Grid  item={true} xs={12}>
                <span style={{ color: "red" }}> { errors }</span>
            </Grid>
            <Grid  item={true} xs={8}>
                <Item>
                    <TextField InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}  label="Email" id="email" onChange={handleChange} value={email} fullWidth />
                </Item>
            </Grid>
            <Grid  item={true} xs={4}>
                <Item>
            <span style={{ color: "red" }}> {email.match(validRegex) < 3 ? "Enter valid email" : ""} </span>
                  
                </Item>
            </Grid>

            <Grid  item={true} xs={8}>
                <Item>

                    <TextField type='password' fullWidth label="Password"  id="password" onChange={handleChange} value={password} />
                </Item>
            </Grid>

            <Grid  item={true} xs={4}>
                <Item>
              <span style={{ color: "red" }}> {password.length < 8 ? "Password must contain atleast 8 characters" : ""} </span>

                </Item>
            
            </Grid>
        </Grid>
        
       <Button style={{margin:"10px"}} onClick={callLogin} variant='filled'>Login</Button>
            
    </>
  
  );
}

export default Login;
