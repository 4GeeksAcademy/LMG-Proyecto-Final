import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
/*import "../../styles/form.css";*/


export const CampaignForm = () => {
	const { store, actions } = useContext(Context);
	const [ong, setOng] = useState(0);
    const [fecha_inicio, setFechaInicio] = useState("");
	const [fecha_finalizacion, setFechaFinalizacion] = useState("");
	const [nombre, setNombre] = useState("");
	const [objetivo, setObjetivo] = useState("");
    const [articulos, setArticulos] = useState("");


	const inputOng = (eOng) =>{
		setOng(eOng.target.value)
		
	};

	const inputFechaInicio = (eFechaInicio) =>{
		setFechaInicio(eFechaInicio.target.value)
		
	};

    const inputFechaFin = (eFechaFin) =>{
		setFechaFinalizacion(eFechaFin.target.value)
		
	};

	const inputNombre = (eNombre) =>{
		setNombre(eNombre.target.value)
		
	};

	const inputObjetivo = (eObjetivo) =>{
		setObjetivo(eObjetivo.target.value)
		
	};
	const inputArticulos = (eArticulos) =>{
		setArticulos(eArticulos.target.value)
		
	};
    
    const handleSave = () => {
        actions.addCampaign({
            ong: ong,
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion,
            nombre: nombre,
            objetivo: objetivo,
            articulos: articulos,
        });
        setOng("");
        setFechaInicio("");
        setFechaFinalizacion("");
        setNombre("");
        setObjetivo("");
        setArticulos("");
    };

	return (
        <>
            <div className="container text-center">
                <h1>Add a new Campaign</h1>
            </div>

            <div className=" row ms-5 p-3">
                <div className="col-12">
                    <label>Nombre de la campaña</label>
                </div>
                <div className="col-12 ">
                    <input className="inputs mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre campaña"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Fecha Inicio</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" type="date" onChange={inputFechaInicio} value={fecha_inicio} placeholder="Fecha inicio"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Fecha Fin</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" type="date" onChange={inputFechaFin} value={fecha_finalizacion} placeholder="Fecha fin"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Lista de artículos</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" onChange={inputArticulos} value={articulos} placeholder="Lista de articulos"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Id Ong</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" onChange={inputOng} value={ong} placeholder="Nombre Ong"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Objetivo a cumplir</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" onChange={inputObjetivo} value={objetivo} placeholder="Objetivo campaña"></input>
                </div>

                <div className="col-12 mt-3">
                    <button className="saveButton" style={{width:"90%"}} onClick={handleSave}>Guardar campaña</button>
                </div>

                <div className="container mt-3">
                    <Link to="/">
                        <button className="saveButton">Volver a campañas</button>
                    </Link>
                </div>
            </div>
        </>
    );
};