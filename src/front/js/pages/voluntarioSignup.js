import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const VoluntarioSignup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function sendData(e) {
        e.preventDefault();
        actions.voluntarioSignup(email, password);
        // Check if signup was successful before navigating
        if (store.auth_voluntario) {
            return <Navigate to="/Voluntario" />;
        }
    }

    return (
        <div className="container mt-3">
            {store.auth_voluntario ? 
                <Navigate to="/Voluntario" />
             : (
        
                <form className="w-50 mx-auto" onSubmit={sendData}>
                    <div className="mb-3">
                        <h1>Signup Voluntario</h1>
                        <p>Crea a tu cuenta de voluntario</p>
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                    </div>
                    <button type="submit" style={{ width: "100%" }} className="btn btn-primary">Crear cuenta</button>
                    <p className="mt-3">¿Ya tienes cuenta? <Link to="/voluntarioLogin">accede aquí</Link></p>
                </form>
            )}
        </div>
    );
};