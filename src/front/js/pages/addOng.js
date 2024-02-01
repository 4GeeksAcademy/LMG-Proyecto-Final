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
        // Verificar si la ruta actual es "/addong"
        if (location.pathname === "/addong") {
            setNombre("");
            setNif("");
            setPassword("");
            setActividad("");
            setAprobado("");
            setCiudad("");
            setEmail("");
            setDireccion("");
        } else {
            // Limpiar solo si no estamos en la ruta "/addong"
            setNombre("");
            setNif("");
            setPassword("");
            setActividad("");
            setAprobado("");
            setCiudad("");
            setEmail("");
            setDireccion("");
        }
    }, [location.pathname]);

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
            const randomIndex = Math.floor(Math.random() * store.ongApi.data.length);
            const ongData = store.ongApi.data[randomIndex];
            console.log('Datos de la API de ONG:', ongData);
            setNombre(ongData.name || "");
            setNif(ongData.ein || "");
            setCiudad(ongData.city || "");
            setEmail(ongData.email || "");
            setActividad(ongData.activity || "");
            setPassword(ongData.income_amt || "");
            setDireccion(ongData.street || "");
        }
    };

    return (
        <>
          {/* Añadir estilo botones del api  */}
            {store.auth_admin && (
                <>
                    <button onClick={() => console.log(store.ongApi)}>Get</button>
                    <button
                        onClick={() => handleFillFromApi()}
                        disabled={!apiDataLoaded}
                    >
                        Rellenar desde la API.
                    </button>
                </>
            )}
      <div className="page-container container d-flex justify-content-center align-items-center mt-3 py-5 ">
            <div className="border border-dark rounded-3 p-4 w-75">
            <h1 className="page-title mb-3">Crea tu cuenta de ONG</h1>
                <div className="mb-3">
                    <label className="form-label">Nombre Organización</label>
                    <input className="form-control mx-auto" onChange={inputNombre} value={nombre}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control mx-auto" type="email" onChange={inputEmail} value={email}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input className="form-control mx-auto" onChange={inputPassword} value={password}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nif</label>
                    <input className="form-control mx-auto" onChange={inputNif} value={nif}></input>
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Actividad</label>
                    <input className="form-control mx-auto" onChange={inputActividad} value={actividad}></input>
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Direccion</label>
                    <input className="form-control mx-auto" onChange={inputDireccion} value={direccion}></input>
                </div>
                <div className=" mb-3">
                    <label className="form-label">Ciudad</label>
                    <input className="form-control mx-auto" type="text" onChange={inputCiudad} value={ciudad} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Aprobado</label>
                    <input className="form-control mx-auto" onChange={inputAprobado} value={aprobado}></input>
                </div>
                <div className="mb-4 mt-3">
                    <button className="btn btn-primary btn-form" style={{ width: "100%" }} onClick={handleSave}>Crear cuenta</button>
                </div>
                <p className="mt-3 text-center">¿Ya tienes cuenta? <Link to="/onglogin">
                         Inicia sesión aquí
                    </Link>
                </p>
                </div>
            </div>
        </>
    );
};
