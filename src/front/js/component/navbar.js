import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    function handleLogout() {
        actions.voluntarioLogout();
        navigate('/');
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Let me give</span>
                </Link>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Para Voluntarios
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/voluntario">Todos los voluntarios</Link></li>
                        <li><Link className="dropdown-item" to="/voluntariologin">Voluntario Login</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                    </ul>
                    {store.auth_voluntario === true ? 
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        : null
                    }
                </div>
            </div>
        </nav>
    );
};
