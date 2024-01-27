import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const EditForm = () => {
    const { actions } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ciudad, setCiudad] = useState("");
    const { theid } = useParams();

    const inputNombre = (eNombre) => {
        setNombre(eNombre.target.value);
    };

    const inputEmail = (eEmail) => {
        setEmail(eEmail.target.value);
    };

    const inputPassword = (ePassword) => {
        setPassword(ePassword.target.value);
    };

    const inputCiudad = (eCiudad) => {
        setCiudad(eCiudad.target.value);
    };

    const handleSave = () => {
        actions.editVoluntario({
            nombre: nombre,
            email: email,
            password: password,
            ciudad: ciudad,
        }, theid);

        setNombre("");
        setEmail("");
        setPassword("");
        setCiudad("");
    };

    return (
        <>
            <h1>Edita tu perfil</h1>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="border border-dark rounded-3 p-4 w-75">
                    <div className="mb-3 col-12">
                        <label>Nombre</label>
                        <input
                            className="form-control inputs mx-auto"
                            onChange={inputNombre}
                            value={nombre}
                            placeholder="Nombre"
                        />
                    </div>

                    <div className="mb-3 col-12">
                        <label>Email</label>
                        <input
                            className="form-control inputs mx-auto"
                            onChange={inputEmail}
                            value={email}
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-3 col-12">
                        <label>Password</label>
                        <input
                            className="form-control inputs mx-auto"
                            onChange={inputPassword}
                            value={password}
                            placeholder="Password"
                        />
                    </div>

                    <div className="mb-3 col-12">
                        <label>Ciudad</label>
                        <input
                            className="form-control inputs mx-auto"
                            onChange={inputCiudad}
                            value={ciudad}
                            placeholder="Ciudad"
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            className="btn btn-primary saveButton"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>

                    <div className="mb-3">
                        <Link to="/">
                            <button className="btn btn-primary saveButton">
                                Volver a Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
