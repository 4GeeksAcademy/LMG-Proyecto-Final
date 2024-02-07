import React from 'react';
const SectionCampaigns = () => {
  return (
    <div className="container-fluid section-campaigns">
      <h1 className="display-5 fw-bold text-center mb-5">Campañas activas</h1>
      <div className="row card-container">
          <div className="col-md-3">
          <div className="card "  style={{width: "20rem"}}>
            <img src="https://images.unsplash.com/photo-1481223014211-199b3e8f0002?q=80&w=2940&auto=format&f[…]3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">El amor ilunima todo</h5>
              <p className="card-text">Caritas</p>
              <p className="card-text">Regala una sonrisa a los niños esta Navidad.</p>
              <a href="/voluntarioLogin" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="https://images.unsplash.com/photo-1646195151271-e4d9f28abcc7?q=80&w=2942&auto=format&f[…]3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Fondo de ayuda emergencias</h5>
              <p className="card-text">Cruz Roja</p>
              <p className="card-text">Colabora por la paz de Ucrania Stop war</p>
              <a href="/voluntarioLogin" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="https://images.unsplash.com/photo-1551556729-c8dee4337009?q=80&w=2940&auto=format&fit=[…]3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Esperanza lejor del hogar</h5>
              <p className="card-text">Acnur</p>
              <p className="card-text">Ayuda los refugiados a encontrar un techo</p>
              <a href="/voluntarioLogin" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="https://images.unsplash.com/photo-1607211851821-8be3cd6146f0?q=80&w=2940&auto=format&f[…]3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Alimenta su educación</h5>
              <p className="card-text">Educo</p>
              <p className="card-text">Colabora con material didáctico para un futuro mejor</p>
              <a href="/voluntarioLogin" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
        <a href="/campaign" className='btn btn-view-all btn-secondary' style={{width: "20%"}}>Ver todas las campañas</a>
        </div>
      </div>

  );
};
export default SectionCampaigns;