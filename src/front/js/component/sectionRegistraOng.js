
import React from 'react';
import { Link } from 'react-router-dom';
const SectionRegistraONG = () => {
  return (
    <div className="container-fluid section-ong">
      <div className="row">
        <div className="col-7">
          <h1 className="display-5 fw-bold">Eres imprescindible, <br/> déjate ayudar </h1>
          <p>Descubre cómo tu ONG puede ser una parte crucial de esta transformación
            <br/>
            Únete a nuestra red solidaria y colabora con voluntarios comprometidos.
          </p>
          <ul className="list-unstyled">
            <li><strong>- Diseña campañas que conecten con corazones solidarios.</strong></li>
            <li><strong>- Potencia el impacto de tu ONG con nuestra red internacional.</strong></li>
            <li><strong>- Obtén apoyo continuo de nuestro equipo.</strong></li>
          </ul>
          <Link to="/addOng" className="btn btn-ong btn-primary" style={{ width: "80%" }} >
            Registra tu ONG
        </Link>
        </div>
        <div className="col-5">
          <img
            src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagen cedida por Educo"
            className="img-fluid w-100"
          />
          <p className="text-note">Banco de alimentos Madrid</p>
        </div>
      </div>
    </div>
  );
};
export default SectionRegistraONG;
