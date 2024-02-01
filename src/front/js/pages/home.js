import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import SectionRegistraONG from '../component/sectionRegistraOng'; // Adjust the path accordingly
import SectionRegistraVoluntario from '../component/sectionRegistraVoluntario'; // Adjust the path accordingly


import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
        <SectionRegistraVoluntario/>
        <SectionRegistraONG />
        </div>
        // <>
        // <div className="hero-banner px-4 py-5 my-5 text-center">
        //     {/* <img className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        //     <h1 className="display-5 fw-bold">Let me Give</h1>
        //     <div className="col-lg-6 mx-auto">
        //     <p className="lead mb-4">Elige una causa y empieza a donar hoy mismo lorem ipsum dolor sit amet </p>
        //     <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        //         <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
        //         <button type="button" className="btn btn-secondary btn-lg px-4">Secondary</button>
        //     </div>
        //     </div>
        // </div>

        //     <div className="container text-center">
        //         <h1>Let me Give</h1>
        //         <h4>Elige una causa y empieza a donar hoy mismo</h4>
        //         <div className="mt-4">
        //             {/* Botón para redirigir a /voluntariologin */}
        //             <Link to="/voluntariologin" className="btn btn-primary mr-3">
        //                 Iniciar Sesión como Voluntario
        //             </Link>
        //             {/* Botón para redirigir a /onglogin */}
        //             <Link to="/onglogin" className="btn btn-secondary">
        //                 Iniciar Sesión como ONG
        //             </Link>
        //         </div>
                
        //     </div>
        // </>
    );
};