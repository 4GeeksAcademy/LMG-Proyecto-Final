import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Voluntarios = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(store.voluntarios)
        actions.getVoluntarios();
    }, []);

    return (
        <div className="container w-75 page-container mt-3">
            <h1 className="page-title mb-3">Listado de Voluntarios </h1>
                {store.voluntarios.map(item => (
                    <div key={item.id} className="d-flex justify-content-between border border-dark rounded-3 p-4 mb-3">
                        <div>
                            <div><strong>Nombre: </strong>{item.nombre}</div>
                            <div><strong>Email: </strong>{item.email}</div>
                            <div><strong>Ciudad: </strong>{item.ciudad}</div>
                            <div><strong>Id: </strong>{item.id}</div>
                            <div><strong>Actividad: </strong>{item.actividad}</div>
                        </div>

                        {store.auth_admin === true ?
                            <>
                                <button type="button" className="btn btn-action btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editVoluntario/${item.id}`)} className="btn btn-action btn-primary">
                                    Editar
                                </button>
                            </>
                         : null }
                    {/* {store.auth_voluntario && (
                            <>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editForm/${item.id}`)} className="btn btn-primary">
                                    Editar
                                </button>
                            </>
                        )} */}

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
                                        <button className="btn btn-action btn-primary" onClick={() => actions.deleteVoluntario(item.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
           
         
            {store.auth_admin === true?
            <>
            <div className="mb-3 px-2">
                <Link to="/addVoluntario">
                    <button className="btn btn-form btn-primary" style={{ width: "100%" }}>Crear Voluntario</button>
                </Link>
                </div>
                <div className="container mb-3">
                 <Link to="/admin">
                 Volver a a tu cuenta de administrador
              </Link>
              </div>
              </>
            :null}
        </div>
    );
};

