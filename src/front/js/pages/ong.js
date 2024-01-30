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
        <div className="container">
        <>
         {store.ongs.map((ong, index) => (
                <div className="container border" key={index}>
                    <div className="row gx-1">
                        <div className="col-md-8">
                            <p className="ongName">{ong.nombre}</p>
                            <p className="ongElements">{ong.nif}</p>
                            <p className="ongElements">{ong.password}</p>
                            <p className="ongElements">{ong.actividad}</p>
                            <p className="ongElements">{ong.aprobado}</p>
                            <p className="ongElements">{ong.ciudad}</p>
							<p className="ongElements">{ong.email}</p>
							<p className="ongElements">{ong.direccion}</p>
							
                        </div>
                        {store.auth_admin === true ?
                        <div className="col-md-1 p-3 editButton">
                            <Link to={`/editong/${ong.id}`} key={ong}>
                                <button className="sideButtons">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>
                                </button>
                            </Link>
                           
                        </div>
                        : null }
                    {store.auth_admin === true ?
                        <div className="col-md-1 p-3">
                            <button type="button" className="btn sideButtons" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
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
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No.</button>
                                            <button onClick={() => botonEliminarOng(ong.id)} type="button" className="btn btn-primary">Sí, quiero borrarla</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    </div>
                </div>
            ))}
            <div className="container mt-5 mb-3">
           
            {store.auth_ong === true ? <Link to="/addOng" className="btn btn-primary" style={{ width: "90%" }}>
                   Crear Ong </Link> : 
           <Link className="btn btn-primary" style={{ width: "90%" }} to="/ongLogin">
           Crear ong
            </Link>
            }
            </div>
        </>
        </div>
    );
};