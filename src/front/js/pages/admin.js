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
        <div className="page-container container mt-5 py-5 w-50 mx-auto" style={{ marginBottom: "280px" }}>
            <h1 className="page-title mb-3">Mi cuenta</h1>
            <p>Bienvenido al perfil de administrador</p>
            {store.auth_admin === true &&
                <>
                    <button onClick={() => verVoluntarios()} className="btn me-2 btn-action btn-primary">Voluntarios</button>
                    <button onClick={() => verONGs()} className="btn me-2 btn-action btn-primary">ONGs</button>
                    <button onClick={() => verCampaigns()} className="btn btn-action btn-primary">Campañas</button>
                    {/* <button onClick={() => crearONG()} className="btn btn-primary">Crear ONG</button> */}
                </>
            }
        </div>
    );
};
