import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const OngEditForm = () => {
    const { actions } = useContext(Context);
    const { theid } = useParams();
    const [ong, setOng] = useState({
        nombre: "",
        email: "",
        password: "",
        ciudad: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOng({ ...ong, [name]: value });
    };

    const handleSave = () => {
        // Validar campos requeridos antes de guardar
        if (ong.nif && ong.nombre && ong.email && ong.password && ong.actividad && ong.aprobado && ong.lat && ong.lng && ong.ciudad) {
            actions.editOng(ong, theid);
            // Limpiar los campos después de guardar
            setOng({
                nif: "",
                nombre: "",
                email: "",
                password: "",
                ciudad: "",
                actividad: "",
                aprobado: "",
                lat: "",
                lng: "",
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };


    return (
     
       
         <>
            <div className="container text-center">
                <h1>Edita tu Ong</h1>
            </div>
            <div className="row ms-5 p-3">
                <div className="col-12 mb-3">
                    <label>Nif</label>
                    <input 
                    className="form-control mx-auto"
                    type="text"
                    name="nif"
                    onChange={handleInputChange}
                    value={ong.nif}
                    placeholder="Nif"/>      
                </div>
                <div className="mb-3">
                        <label>Email</label>
                        <input
                            className="form-control inputs"
                            type="email"
                            name="email"
                            value={ong.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                    </div>
                <div className="col-12 mb-3">
                    <label>Ciudad</label>
                    <input 
                    className="form-control mx-auto" 
                    type="text" 
                    onChange={handleInputChange} 
                    value={ong.ciudad} 
                    name="ciudad"
                    placeholder="Ciudad"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Nombre</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.nombre}
                    name="nombre"
                    placeholder="Nombre Ong"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Actividad</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.actividad}
                    name="actividad"
                    placeholder="Actividad"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Aprobado</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.aprobado}
                    name="aprobado"
                    placeholder="Aprobado"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.password}
                    name="password"
                    placeholder="Contraseña"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Latitud</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.lat}
                    name="lat"
                    placeholder="Latitud"/>
                </div>
                <div className="col-12 mb-3">
                    <label>Longitud</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.lng}
                    name = "lng"
                    placeholder="Longitud"/>
                </div>

                <div className="col-12 mb-3">
                    <button className="btn btn-primary" style={{ width: "90%" }} onClick={handleSave}>Guardar Ong</button>
                </div>
                <div className="container mb-3">
                    <Link to="/tuOng/${`id`}">
                        Volver a tu cuenta
                    </Link>
                </div>
            </div>
        </>
    );
};