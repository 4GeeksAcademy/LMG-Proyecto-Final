import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
export const AddForm
 = () => {
  const { actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
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
    } else if (name === "lat") {
      setLat(value);
    } else if (name === "lng") {
      setLng(value);
    } 
  };
  const addVoluntario = () => {
    const newVoluntario = {
      nombre: nombre,
      email: email,
      password: password,
      ciudad: ciudad,
      lat: lat,
      lng: lng
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
    setLat("");
    setLng("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addVoluntarios();
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border border-dark rounded-3 p-4 w-75">
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
            <div id="emailHelp" className="form-text">
              Tu correo electrónico
            </div>

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
            <label htmlFor="lat" className="form-label">
              Latitud
            </label>
            <input
              type="number"
              name="lat"
              value={lat}
              onChange={handleInputChange}
              className="form-control"
              id="lat"
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lng" className="form-label">
              Longitud
            </label>
            <input
              type="number"
              name="lng"
              value={lng}
              onChange={handleInputChange}
              className="form-control"
              id="lng"
              onKeyDown={handleKeyPress}
            />
          </div>

        
          <button
            type="button"
            onClick={addVoluntario}
            className="btn btn-primary"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};