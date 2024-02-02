import React from 'react';

const SectionHeroBanner = () => {
  return (
    <div className="hero-banner text-center ">
        <h1 className="fw-bold">Let me Give</h1>
        <p className="lead mb-4">Conectamos corazones solidarios creando impacto real en el mundo</p>
        <div className="col-lg-6 mx-auto mt-5">
        <div className="md-grid gap-2 d-sm-flex justify-content-sm-center">
                <a href="/addOng" type="button" className="btn btn-secondary btn-lg px-4">Registra tu ONG</a>
                <a href="/voluntarioSignup" type="button" className="btn btn-primary btn-lg px-4 gap-3">Hazte voluntario</a>
        </div>
        </div>
    </div>
  );
};

export default SectionHeroBanner;

