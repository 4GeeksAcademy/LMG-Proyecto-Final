
  import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; // Import Navigate

export const TuOng = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const botonEliminarCampana = (id) => {
        actions.deleteCampaign(id);

};

const botonEliminarOng = (id) => {
    actions.deleteOng(id);
    navigate("/");
};

useEffect(() => {
    var ongId = localStorage.getItem("id");
    actions.getOngById(ongId);
    actions.loadCampaignsByOng(ongId); // Load campaigns associated with the current ONG ID
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
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteOng">
                                    Eliminar
                                </button>

                                <button onClick={() => navigate(`/editOng/${store.ong.id}`)} className="btn btn-primary">
                                    Editar
                                </button>
                            </>
                        

                        <div className="modal fade" id="deleteOng" tabIndex="-1" aria-labelledby="deleteOngLabel" aria-hidden="true">
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
                                        <button onClick={() => botonEliminarOng(store.ong.id)} type="button" className="btn btn-primary">Sí, quiero borrarla</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
            </ul>
            <h1>Tus campañas</h1>
            <ul className="list-group">
               {store.campaigns.map(item => (

                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            <div>{item.nombre}</div>
                            <div>{item.ong_name}</div>
                            <div>{item.objetivo}</div>
                            <div>{item.fecha_inicio}</div>
                            <div>{item.fecha_finalizacion}</div>
                            <div>{item.articulos}</div>
                        </div>
                            <>
                            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#deleteCampaign${item.id}`}> */}
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteCampaign">
                                    Eliminar
                                </button>
                                <button onClick={() => navigate(`/editCampaign/${item.id}`)} className="btn btn-primary">
                                    Editar
                                </button>
                            </>
                        <div className="modal fade" id="deleteCampaign" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        {/* <div className="modal fade" id={`deleteCampaign${item.id}`} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true"> */}

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
                                        <button onClick={() => botonEliminarCampana(item.id)} type="button" className="btn btn-primary">Sí, quiero borrarla</button>
                                        {/* <button className="btn btn-primary" onClick={() => actions.deleteCampaign(item.id)}>Eliminar</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>))}
            </ul>
            <Link to="/addCampaign" className="btn btn-primary" style={{ width: "90%" }}>
                Crear campaña
            </Link>
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


  export default TuOng;

