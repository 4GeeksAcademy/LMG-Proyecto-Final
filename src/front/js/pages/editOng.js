import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const OngEditForm = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [ong, setOng] = useState({
        nif: "", 
        nombre: "",
        email: "",
        password: "",
        ciudad: "",
        direccion: "",
        actividad: "",
        // aprobado: "",
        // lat: "", 
        // lng: ""
    });
    

    //added 
    useEffect(() => {
        actions.getOngById();
    }, []); 

    useEffect(() => {
        var id = localStorage.getItem("id");
        console.log(id)
        actions.getOngById(id);
        console.log(store.ong)
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOng({ ...ong, [name]: value });
    };

    const handleSave = () => {
        // Validar campos requeridos antes de guardar
        console.log("ong state:", ong);

        if (ong.nif && ong.nombre && ong.email && ong.password && ong.actividad && ong.ciudad) {
            // && ong.aprobado
            actions.editOng(ong, theid);
            // Limpiar los campos después de guardar
            setOng({
                nif: "",
                nombre: "",
                email: "",
                password: "",
                ciudad: "",
                actividad: "",
                // aprobado: "",
                direccion: "",
            });
            alert ("ONG editada correctamente")
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };




    return (
     
       
         <>
            <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
            <div className="border border-dark rounded-3 p-4 w-75">
                <h1 className="page-title mb-3">Edita tu perfil de Ong</h1>
                <div className="mb-3">
                    <label className="form-label">Nif</label>
                    <input 
                    className="form-control mx-auto"
                    type="text"
                    name="nif"
                    onChange={handleInputChange}
                    value={ong.nif}
                    placeholder= {store.ong.nif}
                    />      
                </div>
                <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            className="form-control inputs"
                            type="email"
                            name="email"
                            value={ong.email}
                            onChange={handleInputChange}
                            placeholder= {store.ong.email}
                            
                        />
                    </div>
                <div className="mb-3">
                    <label className="form-label">Ciudad</label>
                    <input 
                    className="form-control mx-auto" 
                    type="text" 
                    onChange={handleInputChange} 
                    value={ong.ciudad} 
                    name="ciudad"
                    placeholder= {store.ong.ciudad}
                />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre Organización</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.nombre}
                    name="nombre"
                    placeholder= {store.ong.nombre}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Actividad</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.actividad}
                    name="actividad"
                    placeholder= {store.ong.actividad}
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Aprobado</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.aprobado}
                    name="aprobado"
                    />
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.password}
                    name="password"
                    placeholder= "*********"
                   />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                    className="form-control mx-auto"
                    onChange={handleInputChange}
                    value={ong.direccion}
                    name="direccion"
                    placeholder= {store.ong.direccion}


                    
                    />
                </div>
                

                <div className="mb-4 mt-3">
                    <button className="btn btn-primary btn-form" style={{ width: "100%" }} onClick={handleSave}>Guardar cambios</button>
                </div>
               
                {store.auth_admin === true ?
                 <div className="container mb-3">
                 <Link to="/adminLogin/">
                     Volver a tu cuenta de administrador
                 </Link>
                </div>
                : 
                <div className="container mb-3">
                <Link to="/tuOng/${`id`}">
                    Volver a tu cuenta
                </Link>
                </div>
                }
                </div>
            </div>
        </>
    );
};