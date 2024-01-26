import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate(); 


	function handlelogout(){
		actions.ongLogout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Let me give</span>
				</Link>
				<div className="btn-group">
					<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						Para Ongs
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="/ong">Ong</a></li>
						<li><a className="dropdown-item" href="/ongLogin">Ong Login</a></li>
						<li><a className="dropdown-item" href="/addOng">Crear Ong</a></li>
						<li><hr className="dropdown-divider"/></li>
						<li><a className="dropdown-item" href="#">Para Logout</a></li>
					</ul>
					</div>		
				{/* <div className="ml-auto">
					<Link className="btn btn-primary" to="/ong">
						ong
					</Link>
				</div> */}
				{/* {store.auth_ong === true ? <button onClick={()=>handlelogout()} className="btn btn-primary">Logout ONG</button>
					: null} */}
			</div>
		</nav>
	);
};