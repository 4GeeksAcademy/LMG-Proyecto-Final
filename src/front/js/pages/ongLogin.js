import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom"; // Import Navigate

const OngLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, actions } = useContext(Context);

  function sendData(e) {
    e.preventDefault();
    console.log('send data');
    console.log(email, password);
    actions.ongLogin(email, password);
  }

  return (
       <>
      {store.auth_ong === true ? <Navigate to="/addCampaign" /> : 
      <div className="container mt-3">
        <form className="w-50 mx-auto" onSubmit={sendData}>
          <div className="mb-3">
            <h1>Login ong</h1>
            <p>Accede a tu cuenta de ong</p>
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="emailInput" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput"></input>
          </div>
          <button type="submit" style={{ width: "100%" }} className="btn btn-primary">
            Acceder
          </button>
          <p className="mt-3">¿Todavía no tienes cuenta? <Link to="/addOng">puedes crearla aquí</Link></p>
        </form>
      </div>
      }
    </>
  );
}


export { OngLogin };

