import React, { useState, useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditVoluntario = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [voluntario, setVoluntario] = useState({
        nombre: "",
        email: "",
        password: "",
        ciudad: "",
        direccion:"",
    });

    useEffect(() => {
        var id = localStorage.getItem("id");
        console.log(id)
        actions.getVoluntarioById(id);
        console.log(store.voluntario)
    }, []);

    
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
                ciudad: "",
                direccion:"",
            });
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <>
        <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
                <div className="border border-dark rounded-3 p-4 w-75">
                <h1 className="page-title mb-3">Edita tu perfil</h1>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control inputs"
                            type="text"
                            name="nombre"
                            value={voluntario.nombre}
                            onChange={handleInputChange}
                            placeholder= {store.voluntario.nombre}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control inputs"
                            type="email"
                            name="email"
                            value={voluntario.email}
                            onChange={handleInputChange}
                            placeholder= {store.voluntario.email}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control inputs"
                            type="password"
                            name="password"
                            value={voluntario.password}
                            onChange={handleInputChange}
                            placeholder= "**********"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ciudad</label>
                        <input
                            className="form-control inputs"
                            type="text"
                            name="ciudad"
                            value={voluntario.ciudad}
                            onChange={handleInputChange}
                            placeholder= {store.voluntario.ciudad}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input
                            className="form-control inputs"
                            type="text"
                            name="direccion"
                            value={voluntario.direccion}
                            onChange={handleInputChange}
                            placeholder= {store.voluntario.direccion}
                        />
                    </div>

                    <div className="mb-3 mt-3">
                        <button className="btn btn-primary btn-form" onClick={handleSave} style={{ width: "100%" }}>
                            Guardar cambios
                        </button>
                    </div>

                    <div className="mb-3">
                        <Link to="/voluntarioDashboard/${`id`}" className="btn btn-secondary btn-form" style={{ width: "100%" }}>
                            Volver a tu cuenta 
                        </Link>
                    </div>

                    <div className="mb-3 text-center">
                        <Link to="/" >
                            Volver a Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
