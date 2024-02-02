import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const CampaignForm = () => {
    const { store, actions } = useContext(Context);
    const [articulos, setArticulos] = useState("");
    const [fecha_finalizacion, setFechaFinalizacion] = useState("");
    const [fecha_inicio, setFechaInicio] = useState("");
    const [nombre, setNombre] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [ongName, setOngName] = useState(store.ong.nombre);
    const navigate = useNavigate();

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

    const inputOngName = (eOngName) => {
        setOngName(eOngName.target.value);
    };

    const handleSave = () => {
        actions.addCampaign({
            fecha_finalizacion: fecha_finalizacion,
            fecha_inicio: fecha_inicio,
            nombre: nombre,
            objetivo: objetivo,
            articulos: articulos,
            ong_name: ongName,
        });

        setFechaFinalizacion("");
        setFechaInicio("");
        setNombre("");
        setObjetivo("");
        setArticulos("");
        setOngName("");
    };

    useEffect(() => {
        var id = localStorage.getItem("id");
        actions.getOngById(id);
    }, []);

    return (
        <>
            {store.auth_ong === true ? (
                <>
                    <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
                        <div className="border border-dark rounded-3 p-4 w-75">
                            <h1 className="page-title mb-3">Crear campaña</h1>
                            <div className=" mb-3">
                                <label className="form-label">Lista de artículos</label>
                                <input className="form-control mx-auto" onChange={inputArticulos} value={articulos} placeholder="Lista de articulos"></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha Inicio</label>
                                <input className="form-control mx-auto" type="date" onChange={inputFechaFin} value={fecha_finalizacion} placeholder="Fecha fin"></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha Fin</label>
                                <input className="form-control mx-auto" type="date" onChange={inputFechaInicio} value={fecha_inicio} placeholder="Fecha inicio"></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de la campaña</label>
                                <input className="form-control mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre campaña"></input>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Objetivo a cumplir</label>
                                <input className="form-control mx-auto" type="text" onChange={inputObjetivo} value={objetivo} placeholder="Objetivo campaña"></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre de la ONG</label>
                                <input className="form-control mx-auto" onChange={inputOngName} value={ongName} placeholder="Nombre de la ONG" readOnly />
                            </div>

                            <div className="mt-3">
                                <button className="btn btn-primary btn-form" style={{ width: "100%" }} onClick={handleSave}>Guardar campaña</button>
                            </div>

                            <div className="mt-3">
                                <Link to={`/TuOng/${localStorage.getItem("id")}`}>
                                    Volver a tu cuenta
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                navigate("/ongLogin")
            )}
        </>
    );
};
