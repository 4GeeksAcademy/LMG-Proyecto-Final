import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Footer = () => {
    const { store } = useContext(Context);

    return (
        <footer className="footer mt-auto py-3 text-center">
            {store.auth_admin === false ? (
                <Link to="/adminlogin" className="">
                    Iniciar Sesión como Admin
                </Link>
            ) : null}
        </footer>
    );
};

