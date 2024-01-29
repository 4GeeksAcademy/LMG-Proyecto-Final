import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditVoluntario = () => {
    const { actions } = useContext(Context);
    const { theid } = useParams();
    const [voluntario, setVoluntario] = useState({
        nombre: "",
        email: "",
        password: "",
        ciudad: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVoluntario({ ...voluntario, [name]: value });
    };

    const handleSave = () => {
        // Validar campos requeridos antes de guardar
        if (voluntario.nombre && voluntario.email && voluntario.password && voluntario.ciudad) {
            actions.editVoluntario(voluntario, theid);
            // Limpiar los campos después de guardar
            setVoluntario({
                nombre: "",
                email: "",
                password: "",
                ciudad: ""
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <>
            
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="border border-dark rounded-3 p-4 w-75">
                <h1>Edita un perfil de voluntario</h1>
                    <div className="mb-3">
                        <label>Nombre</label>
                        <input
                            className="form-control inputs"
                            type="text"
                            name="nombre"
                            value={voluntario.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            className="form-control inputs"
                            type="email"
                            name="email"
                            value={voluntario.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            className="form-control inputs"
                            type="password"
                            name="password"
                            value={voluntario.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Ciudad</label>
                        <input
                            className="form-control inputs"
                            type="text"
                            name="ciudad"
                            value={voluntario.ciudad}
                            onChange={handleInputChange}
                            placeholder="Ciudad"
                        />
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-primary" onClick={handleSave}>
                            Guardar
                        </button>
                    </div>

                    <div className="mb-3">
                        <Link to="/voluntarioDashboard/${`id`}" className="btn btn-secondary">
                            Volver a tu cuenta 
                        </Link>
                    </div>

                    <div className="mb-3">
                        <Link to="/" className="btn btn-secondary">
                            Volver a Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
