
import React from 'react';
import { Link } from 'react-router-dom';


const SectionRegistraONG = () => {
  return (
    <div className="container-fluid section-ong">
      <div className="row">
        <div className="col-md-8">
          <h1 className="display-5 fw-bold">Lorem ipsum ong cta <br/> lorem ipsum dolor sit </h1>
          <p>Your paragraph goes here lorem ipsum dolor sit amet lorem ipsum dolor sit.</p>
          <ul className="list-unstyled">
            <li>icon - Ventaja registrar ong 1</li>
            <li>icon - Ventaja registrar ong 2</li>
            <li>icon - Ventaja registrar ong 3</li>
          </ul>
          <Link to="/addOng" className="btn btn-primary" style={{ width: "60%" }} >
            Registra tu Ong
        </Link>
        </div>

        <div className="col-md-4">
          <img
            src="path/to/your/image.jpg"
            alt="Your Image Alt Text"
            className="img-fluid"
          />
          <p>Here goes my image</p>
        </div>
      </div>
    </div>
  );
};

export default SectionRegistraONG;
