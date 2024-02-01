import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const CampaignEditForm = () => {
    const { store, actions } = useContext(Context);
    const [articulos, setArticulos] = useState("");
    const [fecha_finalizacion, setFechaFinalizacion] = useState("");
    const [fecha_inicio, setFechaInicio] = useState("");
    const [nombre, setNombre] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const { theid } = useParams();
    const [ongName, setOngName] = useState(store.ong.nombre);



    const inputFechaInicio = (eFechaInicio) => {
        setFechaInicio(eFechaInicio.target.value);
    };

    const inputFechaFinalizacion = (eFechaFin) => {
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

    const GetId = () => {
        console.log(`El id del elemento es ----->${theid}`);
    };

    const inputOngName = (eOngName) => {
        setOngName(eOngName.target.value);
    };

    const handleSave = () => {
        actions.editCampaign({
            articulos: articulos,
            fecha_finalizacion: fecha_finalizacion,
            fecha_inicio: fecha_inicio,
            nombre: nombre,
            objetivo: objetivo,
            ong_name: ongName,
        }, theid);
        setArticulos("");
        setFechaFinalizacion("");
        setFechaInicio("");
        setNombre("");
        setObjetivo("");
        setOngName("");
    };

    useEffect(() => {
        var id = localStorage.getItem("id");
        actions.getOngById(id);
    }, []);

    return (
        <>
            <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
            <div className="border border-dark rounded-3 p-4 w-75">
                <h1 className="page-title mb-3">Editar Campaña</h1>
                <div className="mb-3">
                    <label className="form-label">Lista de artículos</label>
                    <input className="form-control mx-auto" onChange={inputArticulos} value={articulos} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha Finalizacion</label>
                    <input className="form-control mx-auto" type="date" onChange={inputFechaFinalizacion} value={fecha_finalizacion} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha Inicio</label>
                    <input className="form-control mx-auto" type="date" onChange={inputFechaInicio} value={fecha_inicio} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre de la campaña</label>
                    <input className="form-control mx-auto" onChange={inputNombre} value={nombre} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Objetivo a cumplir</label>
                    <input className="form-control mx-auto" onChange={inputObjetivo} value={objetivo}></input>
                </div>
                <div className="mb-3">
                <label className="form-label">Nombre de la ONG</label>
                <input className="form-control mx-auto" onChange={inputOngName} value={ongName} ></input>
                 </div>   

                <div className="mb-4 mt-3">
                    <button className="btn btn-primary btn-form" style={{ width: "100%" }} onClick={handleSave}>Guardar cambios</button>
                </div>
                <div className="container mb-3">
                    <Link to={`/TuOng/${localStorage.getItem("id")}`}>
                    Volver a tu cuenta
                    </Link>
                </div>
                </div>
                </div>

        </>
    );
};
