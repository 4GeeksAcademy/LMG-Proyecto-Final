// VoluntarioDashboard.js

// VoluntarioDashboard.js

import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const VoluntarioDashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("id");
        actions.getVoluntarioById(id);
        const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(favoritesFromStorage);
    }, []);

    return (
        <div className="container w-75 page-container mt-3">
            {store.auth_voluntario === true ? (
                <>
                    <div key={store.voluntario.id} className="p-4 mb-3">
                        <h1>Hola de nuevo, {store.voluntario.nombre}</h1>
                        <div>
                            <p>
                                <strong>Nombre: </strong> {store.voluntario.nombre}<br />
                                <strong>Email: </strong>{store.voluntario.email}<br />
                                <strong>Ciudad: </strong>{store.voluntario.ciudad}<br />
                                <strong>Dirección: </strong>{store.voluntario.direccion}<br />
                            </p>
                        </div>
                        <>
                            <button type="button" className="me-2 btn btn-action btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                Eliminar
                            </button>
                            <button type="button" className="btn btn-action btn-primary" onClick={() => navigate(`/editVoluntario/${store.voluntario.id}`)}>
                                Editar
                            </button>
                        </>
                        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="deleteModalLabel">¿Estás seguro?</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Estás a punto de borrar este perfil
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-action btn-secondary" data-bs-dismiss="modal">Mejor no</button>
                                        <button className="btn btn-action btn-primary" onClick={() => actions.deleteVoluntario(store.voluntario.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mb-3">
                        <h3>Has colaborado en estas campañas</h3>

                        {favorites.length > 0 ? (
                            <div className="row">
                                {favorites.map((favorite, index) => (
                                    <div key={index} className="col-md-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{favorite.campaignName}</h5>
                                                <p className="card-text">{favorite.ongName}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Todavía no has realizado donativos</p>
                        )}
                    </div>

                    <div className="container mb-3">
                        {/* <Link to="/">Volver a la Home</Link> */}
                        <a href="/campaign">Ver todas las campañas</a>
                    </div>
                </>
            ) : null}
        </div>
    );
};
