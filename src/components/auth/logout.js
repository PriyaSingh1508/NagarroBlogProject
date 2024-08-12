import { useContext } from "react";
import { UserContext } from "../../data/context/userContext";
import  { Navigate } from 'react-router-dom'
function Logout() {

  const {userLogin} = useContext(UserContext);
  userLogin("","");

  return <Navigate to="/auth/login" />
    
}

export default Logout;