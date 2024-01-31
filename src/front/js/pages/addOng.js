// import React, { useState, useEffect, useContext } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// /* import "../../styles/form.css"; */

// export const OngForm = () => {
//     const { store, actions } = useContext(Context);
//     const [nombre, setNombre] = useState("");
//     const [nif, setNif] = useState("");
//     const [password, setPassword] = useState("");
//     const [actividad, setActividad] = useState("");
//     const [aprobado, setAprobado] = useState("");
//     const [ciudad, setCiudad] = useState("");
//     const [email, setEmail] = useState("");
//     const [direccion, setDireccion] = useState("");
   
//     useEffect(() => {
//         actions.getApi();
//     }, []);


//     const inputNif = (eNif) => {
//         setNif(eNif.target.value);
//     };

//     const inputPassword = (ePassword) => {
//         setPassword(ePassword.target.value);
//     };

//     const inputActividad = (eActividad) => {
//         setActividad(eActividad.target.value);
//     };

//     const inputNombre = (eNombre) => {
//         setNombre(eNombre.target.value);
//     };

//     const inputAprobado = (eAprobado) => {
//         setAprobado(eAprobado.target.value);
//     };

//     const inputCiudad = (eCiudad) => {
//         setCiudad(eCiudad.target.value);
//     };

//     const inputEmail = (eEmail) => {
//         setEmail(eEmail.target.value);
//     };

//     const inputDireccion = (eDireccion) => {
//         setDireccion(eDireccion.target.value);
//     };

  

//     const handleSave = () => {

//         actions.addOng({

//             nif: nif,
//             email: email,
//             ciudad: ciudad,
//             nombre: nombre,
//             actividad: actividad,
//             aprobado:  aprobado,
//             password:  password,
//             direccion:  direccion
            

//         });

//         setNif("");
//         setEmail("");
//         setCiudad("");
//         setNombre("");
//         setActividad("");
//         setAprobado("");
//         setPassword("");
//         setDireccion("");
       
//     };


    

//     return (
       
//             <>
//             <button onClick={()=>console.log(store.ongApi)}>Get</button>
//             <div className="container text-center">
//                 <h1>Crear Ong</h1>
//             </div>
//             <div className="row ms-5 p-3">
//                 <div className="col-12 mb-3">
//                     <label>Nif</label>
//                     <input className="form-control mx-auto" onChange={inputNif} value={nif} placeholder="Nif"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Email</label>

//                     <input className="form-control mx-auto" type="email" onChange={inputEmail} value={email} placeholder="Email"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Ciudad</label>
//                     <input className="form-control mx-auto" type="text" onChange={inputCiudad} value={ciudad} placeholder="Ciudad"></input>

//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Nombre</label>
//                     <input className="form-control mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre Ong"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Actividad</label>
//                     <input className="form-control mx-auto" onChange={inputActividad} value={actividad} placeholder="Actividad"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Aprobado</label>
//                     <input className="form-control mx-auto" onChange={inputAprobado} value={aprobado} placeholder="Aprobado"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Password</label>
//                     <input className="form-control mx-auto" onChange={inputPassword} value={password} placeholder="Contraseña"></input>
//                 </div>
//                 <div className="col-12 mb-3">
//                     <label>Direccion</label>
//                     <input className="form-control mx-auto" onChange={inputDireccion} value={direccion} placeholder="Direccion"></input>
//                 </div>
                

//                 <div className="col-12 mb-3">
//                     <button className="btn btn-primary" style={{ width: "90%" }} onClick={handleSave}>Guardar Ong</button>
//                 </div>

//                 <div className="container mb-3">
//                     <Link to="/ong">
//                         Volver a ong
//                     </Link>
//                 </div>
//             </div>
//             </>
           
//     );
// };

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const OngForm = () => {
    const { store, actions } = useContext(Context);
    const [nombre, setNombre] = useState("");
    const [nif, setNif] = useState("");
    const [password, setPassword] = useState("");
    const [actividad, setActividad] = useState("");
    const [aprobado, setAprobado] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [apiDataLoaded, setApiDataLoaded] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            await actions.getApi();
            setApiDataLoaded(true);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (apiDataLoaded && store.ongApi && Array.isArray(store.ongApi.data) && store.ongApi.data.length > 0) {
            const ongData = store.ongApi.data[0];
            console.log('Datos de la API de ONG:', ongData);
            setNombre(ongData.name || "");
            setNif(ongData.ein || "");
            setCiudad(ongData.city || "");
            setEmail(ongData.email || "");
            setActividad(ongData.activity || ""); // Ajusta según la estructura real
            // Puedes agregar más campos según la estructura real de tu API
        }
    }, [apiDataLoaded, store.ongApi]);

    const inputNif = (eNif) => {
        setNif(eNif.target.value);
    };

    const inputPassword = (ePassword) => {
        setPassword(ePassword.target.value);
    };

    const inputActividad = (eActividad) => {
        setActividad(eActividad.target.value);
    };

    const inputNombre = (eNombre) => {
        setNombre(eNombre.target.value);
    };

    const inputAprobado = (eAprobado) => {
        setAprobado(eAprobado.target.value);
    };

    const inputCiudad = (eCiudad) => {
        setCiudad(eCiudad.target.value);
    };

    const inputEmail = (eEmail) => {
        setEmail(eEmail.target.value);
    };

    const inputDireccion = (eDireccion) => {
        setDireccion(eDireccion.target.value);
    };

    const handleSave = () => {
        actions.addOng({
            nif: nif,
            email: email,
            ciudad: ciudad,
            nombre: nombre,
            actividad: actividad,
            aprobado: aprobado,
            password: password,
            direccion: direccion
        });

        setNif("");
        setEmail("");
        setCiudad("");
        setNombre("");
        setActividad("");
        setAprobado("");
        setPassword("");
        setDireccion("");
    };

    const handleFillFromApi = async () => {
        if (!apiDataLoaded) {
            await fetchData();
        }

        if (store.ongApi && Array.isArray(store.ongApi.data) && store.ongApi.data.length > 0) {
            // Obtén un índice aleatorio para seleccionar un objeto diferente de la API cada vez
            const randomIndex = Math.floor(Math.random() * store.ongApi.data.length);
            const ongData = store.ongApi.data[randomIndex];
            console.log('Datos de la API de ONG:', ongData);
            setNombre(ongData.name || "");
            setNif(ongData.ein || "");
            setCiudad(ongData.city || "");
            // setEmail(ongData.email || "");
            setActividad(ongData.activity || "");
            setPassword(ongData.income_amt || "");
            setDireccion(ongData.street || ""); // Ajusta según la estructura real
            // Puedes agregar más campos según la estructura real de tu API
        }
    };

    return (
        <>
            <button onClick={() => console.log(store.ongApi)}>Get</button>
            <button
                onClick={handleFillFromApi}
                disabled={!apiDataLoaded}
            >
                Rellenar desde la API
            </button>
            <div className="container text-center">
                <h1>Crear Ong</h1>
            </div>
            <div className="row ms-5 p-3">
                <div className="col-12 mb-3">
                    <label>Nif</label>
                    <input className="form-control mx-auto" onChange={inputNif} value={nif} placeholder="Nif"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Email</label>
                    <input className="form-control mx-auto" type="email" onChange={inputEmail} value={email} placeholder="Email"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Ciudad</label>
                    <input className="form-control mx-auto" type="text" onChange={inputCiudad} value={ciudad} placeholder="Ciudad"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Nombre</label>
                    <input className="form-control mx-auto" onChange={inputNombre} value={nombre} placeholder="Nombre Ong"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Actividad</label>
                    <input className="form-control mx-auto" onChange={inputActividad} value={actividad} placeholder="Actividad"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Aprobado</label>
                    <input className="form-control mx-auto" onChange={inputAprobado} value={aprobado} placeholder="Aprobado"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input className="form-control mx-auto" onChange={inputPassword} value={password} placeholder="Contraseña"></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Direccion</label>
                    <input className="form-control mx-auto" onChange={inputDireccion} value={direccion} placeholder="Direccion"></input>
                </div>

                <div className="col-12 mb-3">
                    <button className="btn btn-primary" style={{ width: "90%" }} onClick={handleSave}>Guardar Ong</button>
                </div>

                <div className="container mb-3">
                    <Link to="/ong">
                        Volver a ong
                    </Link>
                </div>
            </div>
        </>
    );
};
