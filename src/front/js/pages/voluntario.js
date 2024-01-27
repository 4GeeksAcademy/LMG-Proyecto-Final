import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Voluntario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(store.voluntarios)
        actions.getVoluntarios();
    }, []);

    return (
        <div className="container">
            <h1>Voluntarios</h1>
            <ul className="list-group">
                {store.voluntarios.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <div>{item.nombre}</div>
                            <div>{item.email}</div>
                            <div>{item.ciudad}</div>
                            <div>{item.id}</div>
                            <div>{item.actividad}</div>
                        </div>

                        {store.auth_voluntario && (
                            <>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editForm/${item.id}`)} className="btn btn-primary">
                                    Editar
                                </button>
                            </>
                        )}

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
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mejor no</button>
                                        <button className="btn btn-primary" onClick={() => actions.deleteVoluntario(item.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Volver a Home</button>
            </Link>
            <br />
            <br />
            {store.auth_voluntario && (
                <Link to="/addVoluntario">
                    <button className="btn btn-primary">Crear Voluntario</button>
                </Link>
            )}
        </div>
    );
};
