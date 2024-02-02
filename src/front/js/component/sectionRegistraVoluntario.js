import React from 'react';
import { Link } from 'react-router-dom';

const SectionRegistraVoluntario = () => {
  return (
    <div className="container-fluid section-voluntario text-center w-75">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-5 fw-bold">Haz tu donativo</h1>
          <p>
          Explora nuestras campañas, elige una causa que resuene contigo y <br/> da un paso significativo hacia un futuro más brillante.
          </p>
          <Link to="/voluntarioSignup" className="btn btn-voluntario" style={{ width: "40%" }}>
            Crea tu cuenta de voluntario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionRegistraVoluntario;

