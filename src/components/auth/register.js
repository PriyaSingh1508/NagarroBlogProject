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

function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCPassword] = useState("");
  let [errors, setErrors] = useState("");
  let {iUser, userRegister} = useContext(UserContext);
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    switch(e.target.id){
    case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
      case "cpassword":
        setCPassword(e.target.value);
        break;
    }
  };

  const callRegister = () => {

    if(name.length < 3 || !email.match(validRegex) || password.length < 8 || password != cpassword){
      return ;
    }

    let isCreated = userRegister(name,email,password);
    console.log(isCreated);

    if(isCreated){
        setErrors("");
        navigate("/auth/login");
    }
    else{
        setErrors("Email Already exists");
    }
    
  }
   
  return (
    <>

        <h1>Register</h1>
       

        <Grid container spacing={2}>
        <Grid  item={true} xs={12}>
                <span style={{ color: "red" }}> { errors }</span>
            </Grid>
        <Grid  item={true} xs={8}>
                <Item>
                    <TextField 
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                  }} label="Name"  id="name" onChange={handleChange} value={name} />
                </Item>
            </Grid>
            <Grid  item={true} xs={4}>
            <span style={{ color: "red" }}> {name.length < 3 ? "Name must contain atleast 3 letters" : ""} </span>

            </Grid>

            <Grid  item={true} xs={8}>
                <Item>
                    <TextField label="Email" id="email" onChange={handleChange} value={email} fullWidth />

                </Item>
            </Grid>
            <Grid  item={true} xs={4}>
            <span style={{ color: "red" }}> {email.match(validRegex) < 3 ? "Enter valid email" : ""} </span>

            </Grid>

            <Grid  item={true} xs={8}>
                <Item>
                    <TextField type='password' fullWidth label="Password"  id="password" onChange={handleChange} value={password} />
                </Item>
            </Grid>

            <Grid  item={true} xs={4}>
              <span style={{ color: "red" }}> {password.length < 8 ? "Password must contain atleast 8 characters" : ""} </span>

            </Grid>

        <Grid  item={true} xs={8}>
                <Item>
                    <TextField type='password' fullWidth label="Confirm Password"  id="cpassword" onChange={handleChange} value={cpassword} />
                </Item>
            </Grid>

            <Grid  item={true} xs={4}>
            <span style={{ color: "red" }}> {password != cpassword ? "Passwords must match" : ""}</span>
            </Grid>
        </Grid>
        
       <Button style={{margin:"10px"}} onClick={callRegister} variant='filled'>Register</Button>
            
    </>
  
  );
}

export default Register;
