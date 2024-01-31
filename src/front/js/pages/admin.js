import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/home.css";

export const Admin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function verVoluntarios() {
        navigate('/voluntarios');
    }

    function verONGs() {
        navigate('/Ong');
    }

    function verCampaigns() {
        navigate('/campaign');
    }

    function crearONG() {
        navigate('/addong');
    }

    return (
        <div className="text-center mt-5">
            <h1>Mi cuenta</h1>
            <p>Bienvenido al perfil de administrador</p>
            {store.auth_admin === true &&
                <>
                    <button onClick={() => verVoluntarios()} className="btn btn-primary">Voluntarios</button>
                    <button onClick={() => verONGs()} className="btn btn-primary">ONGs</button>
                    <button onClick={() => verCampaigns()} className="btn btn-primary">Campañas</button>
                    <button onClick={() => crearONG()} className="btn btn-primary">Crear ONG</button>
                </>
            }
        </div>
    );
};
