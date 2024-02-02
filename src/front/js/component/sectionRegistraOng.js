
import React from 'react';
import { Link } from 'react-router-dom';
const SectionRegistraONG = () => {
  return (
    <div className="container-fluid section-ong">
      <div className="row">
        <div className="col-7">
          <h1 className="display-5 fw-bold">Eres imprescindible, <br/> déjate ayudar </h1>
          <p>Tu proyecto puede ser parte de este cambio. Empieza hoy mismo.</p>
          <ul className="list-unstyled">
            <li> - Crea un perfil</li>
            <li> - Crea una campaña</li>
            <li> - Forma equipo</li>
          </ul>
          <Link to="/addOng" className="btn btn-primary" style={{ width: "60%" }} >
            Registra tu Ong
        </Link>
        </div>
        <div className="col-5">
          <img
            src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagen cedida por Educo"
            className="img-fluid w-100"
          />
          <p>Banco de alimentos Madrid</p>
        </div>
      </div>
    </div>
  );
};
export default SectionRegistraONG;
