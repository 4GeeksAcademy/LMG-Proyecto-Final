import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const VoluntarioSignup = () => {
    const { actions } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [voluntarioLink, setVoluntarioLink] = useState(null);
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "nombre") {
        setNombre(value);
      } else if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "ciudad") {
        setCiudad(value);
      } else if (name === "direccion") {
        setDireccion(value);
      } 
    };
    const addVoluntario = () => {
      const newVoluntario = {
        nombre: nombre,
        email: email,
        password: password,
        ciudad: ciudad,
        direccion: direccion,
      };
  
      setVoluntarioLink(newVoluntario);
      actions.addVoluntario(newVoluntario);
      deleteHandleInputChange();
      console.log("Nuevo Voluntario JSON:", newVoluntario);
    };
    const deleteHandleInputChange = () => {
      setNombre("");
      setEmail("");
      setPassword("");
      setCiudad("");
      setDireccion("");
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addVoluntarios();
      }
    };
    return (
      <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
        <div className="border border-dark rounded-3 p-4 w-75">
        <h1 className="page-title mb-3">Crea a tu cuenta y forma parte del cambio</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                className="form-control"
                id="nombre"
                aria-describedby="nombreHelp"
                onKeyDown={handleKeyPress}
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onKeyDown={handleKeyPress}
              />
              {/* <div id="emailHelp" className="form-text">
                Tu correo electrónico
              </div> */}
  
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="form-control"
                id="password"
                onKeyDown={handleKeyPress}
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={ciudad}
                onChange={handleInputChange}
                className="form-control"
                id="ciudad"
                onKeyDown={handleKeyPress}
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={direccion}
                onChange={handleInputChange}
                className="form-control"
                id="direccion"
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="mb-4 mt-3">
            <button
              style={{ width: "100%" }}
              type="button"
              onClick={addVoluntario}
              className="btn btn-primary btn-form"
            >
              Hazte voluntario
            </button>
            </div>
            <p className="mt-3 text-center">¿Ya tienes cuenta? <Link to="/voluntarioLogin">Inicia sesión aquí</Link></p>
          </form>
        </div>
      </div>
    );
  };