import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";


export const TuOng = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate(); 


	function handlelogoutOng(){
		actions.ongLogout()
		navigate('/')
	}

	return (
		<div className="text-center mt-5">
			<h1>Ong</h1>
			<p>Bienvenido a tu cuenta Ong</p>
			{store.auth_ong === true ? <button onClick={()=>handlelogoutOng()} className="btn btn-primary">Logout Ong</button>
					: null}
		</div>
	);
};