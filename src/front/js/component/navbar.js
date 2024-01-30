import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    function handleLogout() {
        actions.ongLogout();
        actions.adminLogout();
        actions.voluntarioLogout();
        navigate('/');
    }
    const favoritesMap = store.favorites;
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Let me give</span>
                </Link>
                
                {/* Mostrar el botón de ONG solo si el usuario está autenticado como ONG */}
                {store.auth_ong &&
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Ongs
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/ong">Ong</a></li>
                            <li><a className="dropdown-item" href="/ongLogin">Ong Login</a></li>
                            <li><a className="dropdown-item" href="/campaign">Campaign</a></li>
                            <li><hr className="dropdown-divider"/></li>
                        </ul>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>
                }

                {/* Mostrar el botón de Voluntario solo si el usuario está autenticado como Voluntario */}
                {store.auth_voluntario &&
                
                    <div className="btn-group">
                         <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
							<span className="btn btn-warningprimary text-ligth">{favoritesMap.length > 0 ? favoritesMap.length : " " }</span>
						</button>
						<ul className="dropdown-menu ">
							{favoritesMap.map((item, i) => (
								<li key={i} className="dropdown-item d-flex justify-content-between">
									{item}
									<span onClick={() => actions.deleteFavorite(item)}>
									<i className="fas fa-trash "></i>
									</span>
								</li>
							))}
                        
                            
                        </ul>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Voluntarios
                </button>
                <ul className="dropdown-menu">

                    <li><Link className="dropdown-item" to={`/voluntarioDashboard/${localStorage.getItem("id")}`}>Mi perfil</Link></li>
                    <li><Link className="dropdown-item" to="/campaign">Todas las campañas</Link></li>
                   
                </ul>
                        
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>
                }

                {store.auth_admin &&
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/voluntarios"> Voluntarios</Link></li>
                            <li><Link className="dropdown-item" to="/ong"> ONGS</Link></li>
                            <li><Link className="dropdown-item" to="/campaign"> Campañas</Link></li>
                           
                        </ul>
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                    </div>
                }
            </div>
        </nav>
    );
}

