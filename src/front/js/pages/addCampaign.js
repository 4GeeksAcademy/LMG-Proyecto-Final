import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
/* import "../../styles/form.css"; */

export const CampaignForm = () => {
    const { store, actions } = useContext(Context);
    const [articulos, setArticulos] = useState("");
    const [fecha_finalizacion, setFechaFinalizacion] = useState("");
    const [fecha_inicio, setFechaInicio] = useState("");
    const [nombre, setNombre] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [ongId, setOngId] = useState(0);

    const inputOng = (eOng) => {
        setOngId(eOng.target.value);
    };

    const inputFechaInicio = (eFechaInicio) => {
        setFechaInicio(eFechaInicio.target.value);
    };

    const inputFechaFin = (eFechaFin) => {
        setFechaFinalizacion(eFechaFin.target.value);
    };

    const inputNombre = (eNombre) => {
        setNombre(eNombre.target.value);
    };

    const inputObjetivo = (eObjetivo) => {
        setObjetivo(eObjetivo.target.value);
    };

    const inputArticulos = (eArticulos) => {
        setArticulos(eArticulos.target.value);
    };

    const handleSave = () => {
        actions.addCampaign({
            articulos: articulos,
            fecha_finalizacion: fecha_finalizacion,
            fecha_inicio: fecha_inicio,
            nombre: nombre,
            objetivo: objetivo,
            ong_id: ongId,
        });
        setArticulos("");
        setFechaFinalizacion("");
        setFechaInicio("");
        setNombre("");
        setObjetivo("");
        setOngId(0);
    };

    return (
        <>
        {store.auth_admin === true ? 
            <>
            <div className="container text-center">
                <h1>Crear campaña</h1>
            </div>
            <div className="row ms-5 p-3">
                <div className="col-12 mb-3">
                    <label>Lista de artículos</label>
                    <input className="form-control mx-auto" onChange={inputArticulos} value={articulos} placeholder="Lista de articulos"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Fecha Fin</label>
                    <input className="form-control mx-auto" type="date" onChange={inputFechaFin} value={fecha_finalizacion} placeholder="Fecha fin"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Fecha Inicio</label>
                    <input className="form-control mx-auto" type="date" onChange={inputFechaInicio} value={fecha_inicio} placeholder="Fecha inicio"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Nombre de la campaña</label>
                    <input className="form-control mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre campaña"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Objetivo a cumplir</label>
                    <input className="form-control mx-auto" onChange={inputObjetivo} value={objetivo} placeholder="Objetivo campaña"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Id Ong</label>
                    <input className="form-control mx-auto" onChange={inputOng} value={ongId} placeholder="Id Ong"></input>
                </div>

                <div className="col-12 mb-3">
                    <button className="btn btn-primary" style={{ width: "90%" }} onClick={handleSave}>Guardar campaña</button>
                </div>

                <div className="container mb-3">
                    <Link to="/campaign">
                        Volver a campañas
                    </Link>
                </div>
            </div>
            </>
           : <Navigate to="/adminLogin" /> }
        </>
    );
};
