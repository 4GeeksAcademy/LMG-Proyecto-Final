import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
/*import "../../styles/form.css";*/


export const CampaignEditForm = () => {
	const { store, actions } = useContext(Context);
	const [ong, setOng] = useState("");
    const [fecha_inicio, setFechaInicio] = useState("");
	const [fecha_fin, setFechaFin] = useState("");
	const [nombre, setNombre] = useState("");
	const [objetivo, setObjetivo] = useState("");
    const [articulos, setArticulos] = useState("");
	const { theid } = useParams();


    const inputOng = (eOng) =>{
		setOng(eOng.target.value)	
	};

	const inputFechaInicio = (eFechaInicio) =>{
		setFechaInicio(eFechaInicio.target.value)	
	};

    const inputFechaFin = (eFechaFin) =>{
		setFechaFin(eFechaFin.target.value)	
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

	const GetId = () =>{
		console.log(`El id del elemento es ----->${theid}`)
	}

    const handleSave = () => {
        actions.editCampaign({
            ong: ong,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            nombre: nombre,
            objetivo: objetivo,
            articulos: articulos,
        }, theid);
        setOng("");
        setFechaInicio("");
        setFechaFin("");
        setNombre("");
        setObjetivo("");
        setArticulos("");
    };


	return (
		<>
		<div className="container text-center">
			<h1>Editar Campaña</h1>
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
                    <input className="inputs mx-auto" type="date" onChange={inputFechaFin} value={fecha_fin} placeholder="Fecha fin"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Lista de artículos</label>
                </div>
                <div className="col-12">
                    <input className="inputs mx-auto" onChange={inputArticulos} value={articulos} placeholder="Lista de articulos"></input>
                </div>

                <div className="col-12 mt-3">
                    <label>Nombre Ong</label>
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

