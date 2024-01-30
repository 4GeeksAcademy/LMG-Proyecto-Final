import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; // Import Navigate

export const TuOng = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

    useEffect(() => {
        var id = localStorage.getItem("id");
        console.log(id)
        actions.getOngById(id);
        console.log(store.ong)
    }, []);

    return (
        
        <div className="container">
            <h1>ONGS</h1>
            {store.auth_ong === true ?
            <>
            <ul className="list-group">
                    <li key={store.ong.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <div>{store.ong.nombre}</div>
                            <div>{store.ong.email}</div>
                            <div>{store.ong.ciudad}</div>
                            <div>{store.ong.direccion}</div>
                            
                            
                        </div>

                        
                            <>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editOng/${store.ong.id}`)} className="btn btn-primary">
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
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mejor no</button>
                                        <button className="btn btn-primary" onClick={() => actions.deleteOng(store.ong.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Volver a Home</button>
            </Link>
            <br />
            <br />
                </>
             : null
            }
        </div>
    );
  };
