import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Ong = () => {
    const { store, actions } = useContext(Context);
   

    useEffect(() => {
        actions.getOngs();
    }, []);



    const botonEliminarOng = (id) => {
        actions.deleteOng(id);

    
    };

    return (
        <div className="container w-75 page-container mt-4 py-4">
        <>
        
        <h1 className="page-title mb-3">Listado de ONGs</h1>

         {store.ongs.map((ong, index) => (
                <div className="d-flex justify-content-between border border-dark rounded-3 p-4 mb-3" key={index}>
                        <div>
                            <p className="ongName"><strong>Nombre: </strong>{ong.nombre}</p>
                            <p className="ongElements"><strong>Email: </strong>{ong.email}</p>
                            <p className="ongElements"><strong>Actividad: </strong>{ong.actividad}</p>
                            <p className="ongElements"><strong>NIF: </strong>{ong.nif}</p>
                            <p className="ongElements"><strong>Dirección: </strong>{ong.direccion}</p>
                            <p className="ongElements"><strong>Ciudad: </strong>{ong.ciudad}</p>
                            <p className="ongElements"><strong>Aprobado: </strong>{ong.aprobado}</p>
							
                        </div>

                      
                    {store.auth_admin === true ?
                        <div className="p-3">
                            <button type="button" className="btn btn-action btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Eliminar
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar Campaña</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            Seguro que quieres eliminar esta campaña?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn  btn-action btn-secondary" data-bs-dismiss="modal">No.</button>
                                            <button onClick={() => botonEliminarOng(ong.id)} type="button" className="btn btn-action btn-primary">Sí, quiero borrarla</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        : null} 
                    {store.auth_admin === true ?
                    
                    <div className=" p-3 editButton">
                        <Link to={`/editong/${ong.id}`} key={ong}>
                            <button className="btn btn-action btn-primary">
                              Editar
                            </button>
                        </Link>
                       
                    </div>
                     : null } 
                </div>
            ))}
            <div className=" mb-3">
            <Link to="/addOng" className="btn btn-form btn-primary" style={{ width: "100%" }}>
                   Crear Ong </Link> 
            {/* {store.auth_ong === true || store.auth_admin === true ? <Link to="/addOng" className="btn btn-form btn-primary" style={{ width: "100%" }}>
                   Crear Ong </Link> : 
           <Link className="btn btn-primary btn-form" style={{ width: "100%" }} to="/ongLogin">
           Crear ong
            </Link>
            } */}
            </div>
            {store.auth_admin === true ?
                 <div className="container mb-3">
                 <Link to="/adminLogin/">
                     Volver a tu cuenta de administrador
                 </Link>
                </div>
                : null}
        </>
        </div>
    );
};