import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeroBanner = () => {
  return (
    <div className="hero-banner text-center ">
        <h1 className="fw-bold">Let me Give</h1>
        <p className="lead mb-4">Lorem ipsum dolor dolor sit amet lorem ipsum dolor lorem ipsum dolor sit lorem </p>
        <div className="col-lg-6 mx-auto mt-5">
        <div className="md-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                <button type="button" className="btn btn-secondary btn-lg px-4">Secondary</button>
        </div>
        </div>
    </div>
  );
};

export default SectionHeroBanner;

