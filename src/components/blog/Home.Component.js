import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import "../../assets/css/home.css";
import Button from "@mui/material-next/Button";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { UserContext } from "../../data/context/userContext";
function Home() {
	let count = useSelector((state) => state.counter).value;
	const { iUser } = useContext(UserContext);

	return (
		<div style={{ backgroundImage: `linear-gradient(to right,rgb(75, 127, 133), rgba(0, 133, 156, 1))`, }}>
			<div className="nav">
				<header className="nav-header">
					{/* <Link to="/"> */}
					<span className="nav-heading">
						<Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
							Welcome!
							{/* <img src={logo} className="nav-logo" alt="logo" /> */}
							
						</Link>

						{/* </Link> */}
						{iUser && (
							<Link to="/post/create">
								<Button startIcon={<AddIcon />}>Add Post</Button>
							</Link>
						)}

						<span className="spacer">&emsp;</span>
						<span className="menu-options">
							{iUser && (
								<>
									<span>{iUser}</span>
									<Link to="/auth/logout">
										<Button startIcon={<LogoutIcon />}>Logout</Button>
									</Link>
								</>
							)}
							{!iUser && (
								<Link to="/auth/login">
									<Button startIcon={<LoginIcon />}>LogIn</Button>
								</Link>
							)}
							{!iUser && (
								<Link to="/auth/register">
									<Button startIcon={<VerifiedUserIcon />}>Signup</Button>
								</Link>
							)}
						</span>
					</span>
				</header>
			</div>

			<div className="center" style={{ backgroundImage: `linear-gradient(to right,rgb(75, 127, 133), rgba(0, 133, 156, 1))`}}>
				<div className="home-heading">Curious?</div>

				<p>
					Learn about new topics and stay updated!
				</p>

				<Link to="/post">
					<Button variant="filled" size="large">
						Let's Start Reading
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
