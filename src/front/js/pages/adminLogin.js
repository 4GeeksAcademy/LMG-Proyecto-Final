import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom"; // Import Navigate

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, actions } = useContext(Context);

  function sendData(e) {
    e.preventDefault();
    console.log('send data');
    console.log(email, password);
    actions.adminLogin(email, password);
  }

  return (
    <>
    {store.auth_admin === true ? <Navigate to="/admin" /> : 
    <div className="page-container container mt-5 py-5 w-50 mx-auto">
        <h1 className="page-title mb-3">Accede como administrador</h1>
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="emailInput" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput"></input>
          </div>
          <div class="mb-4 mt-3">
          <button type="submit" style={{ width: "100%" }}  className="btn btn-primary btn-form">
          Iniciar sesión
          </button>
          </div>
        </form>
        </div>
      }
      </>
  );
}

export { AdminLogin };
