import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
/* import "../../styles/form.css"; */

export const OngForm = () => {
    const { store, actions } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [nif, setNif] = useState("");
    const [password, setPassword] = useState("");
    const [actividad, setActividad] = useState("");
    const [aprobado, setAprobado] = useState("");
    const [ciudad, setCiudad] = useState();
    const [email, setEmail] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();


    const inputNif = (eNif) => {
        setNif(eNif.target.value);
    };

    const inputPassword = (ePassword) => {
        setPassword(ePassword.target.value);
    };

    const inputActividad = (eActividad) => {
        setActividad(eActividad.target.value);
    };

    const inputNombre = (eNombre) => {
        setNombre(eNombre.target.value);
    };

    const inputAprobado = (eAprobado) => {
        setAprobado(eAprobado.target.value);
    };

    const inputCiudad = (eCiudad) => {
        setCiudad(eCiudad.target.value);
    };

    const inputEmail = (eEmail) => {
        setEmail(eEmail.target.value);
    };

    const inputLat = (eLat) => {
        setLat(eLat.target.value);
    };

    const inputLng = (eLng) => {
        setLng(eLng.target.value);
    };

    const handleSave = () => {
        actions.addOng({
            nif: nif,
            email: email,
            ciudad: ciudad,
            nombre: nombre,
            actividad: actividad,
            aprobado:  aprobado,
            password:  password,
            lat:  lat,
            lng:  lng
        });

        setNif("");
        setEmail("");
        setCiudad("");
        setNombre("");
        setActividad("");
        setAprobado("");
        setPassword("");
        setLat();
        setLng();
    };

    return (
       
            <>
            <div className="container text-center">
                <h1>Crear Ong</h1>
            </div>
            <div className="row ms-5 p-3">
                <div className="col-12 mb-3">
                    <label>Nif</label>
                    <input className="form-control mx-auto" onChange={inputNif} value={nif} placeholder="Nif"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Email</label>
                    <input className="form-control mx-auto" type="email" onChange={inputEmail} value={email} placeholder="Email"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Ciudad</label>
                    <input className="form-control mx-auto" type="text" onChange={inputCiudad} value={ciudad} placeholder="Ciudad"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Nombre</label>
                    <input className="form-control mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre Ong"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Actividad</label>
                    <input className="form-control mx-auto" onChange={inputActividad} value={actividad} placeholder="Actividad"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Aprobado</label>
                    <input className="form-control mx-auto" onChange={inputAprobado} value={aprobado} placeholder="Aprobado"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input className="form-control mx-auto" onChange={inputPassword} value={password} placeholder="Contraseña"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Latitud</label>
                    <input className="form-control mx-auto" onChange={inputLat} value={lat} placeholder="Latitud"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Longitud</label>
                    <input className="form-control mx-auto" onChange={inputLng} value={lng} placeholder="Longitud"></input>
                </div>

                <div className="col-12 mb-3">
                    <button className="btn btn-primary" style={{ width: "90%" }} onClick={handleSave}>Guardar Ong</button>
                </div>

                <div className="container mb-3">
                    <Link to="/ong">
                        Volver a ong
                    </Link>
                </div>
            </div>
            </>
           
    );
};