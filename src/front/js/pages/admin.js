import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";


export const Admin = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate(); 


	function handlelogout(){
		actions.adminLogout()
		navigate('/')
	}

	return (
		<div className="text-center mt-5">
			<h1>Your Account</h1>
			<p>Welcome to your admin account</p>
			{store.auth_admin === true ? <button onClick={()=>handlelogout()} className="btn btn-primary">Logout</button>
					: null}
		</div>
	);
};