import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from 'react-router-dom';


export const Home = () => {
	return(
		<>
		<div className="container text-center">
		<h1>Let me Give</h1>
		<h4>Elige una causa y empieza a donar hoy mismo</h4>
		</div>
		</>

	)


};

