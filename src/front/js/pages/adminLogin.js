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
    <div className="container mt-3">
       {store.auth_admin === true ? <Navigate to="/admin" /> : 
        <form className="w-50 mx-auto" onSubmit={sendData}>
          <div className="mb-3">
          <h1>Login admin</h1>
            <p>Accede a tu cuenta de administrador</p>
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="emailInput" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput"></input>
          </div>
          <button type="submit" style={{ width: "100%" }}  className="btn btn-primary">
          Acceder
          </button>
            
        </form>
      }
    </div>
  );
}

export { AdminLogin };
