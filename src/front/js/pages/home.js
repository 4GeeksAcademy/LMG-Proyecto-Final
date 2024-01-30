import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <button onClick={()=> actions.getApi()}>Get</button>
        <button onClick={()=>console.log(store.ongApi)}>Get</button>


            <div className="container text-center">
                <h1>Let me Give</h1>
                <h4>Elige una causa y empieza a donar hoy mismo</h4>
                <div className="mt-4">
                    {/* Botón para redirigir a /voluntariologin */}
                    <Link to="/voluntariologin" className="btn btn-primary mr-3">
                        Iniciar Sesión como Voluntario
                    </Link>
                    {/* Botón para redirigir a /onglogin */}
                    <Link to="/onglogin" className="btn btn-secondary">
                        Iniciar Sesión como ONG
                    </Link>
                </div>
                
            </div>
        </>
    );
};