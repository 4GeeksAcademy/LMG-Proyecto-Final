import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Voluntario = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <h1>Voluntarios</h1>
            <ul className="list-group">
                {store.voluntarios.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between"
                            >
                            { item.nombre }
                            <br></br>
                            { item.email }
                            <br></br>
                            { item.ciudad }
                            <br></br>
                            { item.id }
                            <br></br>
                            { item.actividad }
                            
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                Eliminar
                            </button>

                            {/* Modal */}
                            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="deleteModalLabel">¿Estás segurx?</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Estás a punto de borrar este perfil
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mejor no</button>
                                    <button className="btn btn-primary" onClick={()=>actions.deleteVoluntario(item.id)}>Eliminar</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                            <Link to={`/editForm/${item.id}`}>
                            <button className="btn btn-primary">Editar</button>
                        </Link>
                        </li>
                    );
                })}
            </ul>
            <br />
            <Link to="/voluntario">
                <button className="btn btn-primary">Volver a voluntarios</button>
            </Link>
            <br />
            <br />
            <Link to="/addVoluntario">
                <button className="btn btn-primary">Crear Voluntario</button>
            </Link>
        </div>
    );
};