import logo from "../../../assets/logo.svg";
import '../../../assets/css/navbar.css';
import Button from "@mui/material-next/Button";
import { Outlet, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { UserContext } from "../../../data/context/userContext";

function NavBar() {

  const {iUser} = useContext(UserContext);

  return (
    <>
      <nav className="nav">
        <header className="nav-header">
            
              <span className="nav-heading">
                <Link to={"/"} style={{"textDecoration": "none", "color":"white"}}>
                  Home
                  {/* React
                    <img src={logo} className="nav-logo" alt="logo" />
                  Assignment */}
                </Link>
               
              <Link to="/post">
                <Button >All Posts</Button>
              </Link>  
            { iUser &&
              <Link to="/post/create">
                <Button  startIcon={<AddIcon />} >Create Post</Button>
              </Link>  
            }
            <span className="spacer">&emsp;</span>
            <span className="menu-options">

            { iUser &&
            <>
              <span >
                { iUser }
              </span>
              <Link to="/auth/logout">
                <Button  startIcon={<LogoutIcon />} >Logout</Button>
              </Link>  
            </>
              
            }
            { !iUser &&
              <Link to="/auth/login">
                <Button  startIcon={<LoginIcon />} >Login</Button>
              </Link>  
            }   
             { !iUser &&
              <Link to="/auth/register">
                <Button  startIcon={<VerifiedUserIcon />} >Register</Button>
              </Link>  
            }   
            </span>
              </span>
           
             
        </header>
      </nav>
      <div className="container">
        <Outlet></Outlet>
    </div>
    </>
    
  );
}

export default NavBar;
