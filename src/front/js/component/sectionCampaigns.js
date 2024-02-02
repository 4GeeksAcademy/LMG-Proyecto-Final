import React from 'react';

const SectionCampaigns = () => {
  return (
    <div className="container-fluid section-campaigns">
      <h1 className="display-5 fw-bold text-center ">Campañas activas</h1>
      <div className="row card-container">
          <div className="col-md-3">
          <div className="card "  style={{width: "20rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Nombre campaña lorem</h5>
              <p className="card-text">ONG Name</p>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Nombre campaña lorem</h5>
              <p className="card-text">ONG Name</p>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Nombre campaña lorem</h5>
              <p className="card-text">ONG Name</p>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          <div className="col-md-3">
          <div className="card"  style={{width: "20rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Nombre campaña lorem</h5>
              <p className="card-text">ONG Name</p>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-card btn-primary">Donar</a>
            </div>
          </div>
          </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
        <a href="/campaign" className='btn btn-secondary'>Ver todas las campañas</a>
        </div>
      </div>
   
  );
};

export default SectionCampaigns;

