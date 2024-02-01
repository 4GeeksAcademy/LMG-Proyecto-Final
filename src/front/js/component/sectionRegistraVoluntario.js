// // SectionRegistraVoluntario.js

// import React from 'react';
// import { Link } from 'react-router-dom';

// const SectionRegistraVoluntario = () => {
//   return (
//     <div className="container-fluid section-voluntario">
//       <div className="row">
//       <div className="col-md-4">
//           <img
//             src="path/to/your/volunteer-image.jpg"
//             alt="Your Volunteer Image Alt Text"
//             className="img-fluid"
//           />
//           <p>Here goes my volunteer image</p>
//         </div>
//         <div className="col-md-8 justify-content-end">
//           <h1 className="display-5 fw-bold">Lorem ipsum voluntario cta <br/> lorem ipsum dolor sit </h1>
//           <p>Your paragraph goes here lorem ipsum dolor sit amet lorem ipsum dolor sit.</p>
//           <ul className="list-unstyled">
//             <li>icon - Ventaja registrar voluntario 1</li>
//             <li>icon - Ventaja registrar voluntario 2</li>
//             <li>icon - Ventaja registrar voluntario 3</li>
//           </ul>
//           <Link to="/addVoluntario" className="btn btn-primary" style={{ width: "60%" }}>
//             Registra como Voluntario
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionRegistraVoluntario;

// SectionRegistraVoluntario.js

import React from 'react';
import { Link } from 'react-router-dom';

const SectionRegistraVoluntario = () => {
  return (
    <div className="container-fluid section-voluntario text-center w-75">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-5 fw-bold">Haz tu donativo</h1>
          <p>Your paragraph goes here lorem ipsum dolor sit amet lorem ipsum dolor sit.
            <br/>
          Your paragraph goes here lorem ipsum dolor sit amet lorem ipsum dolor sit.
          </p>
          <Link to="/voluntarioSignup" className="btn btn-primary" style={{ width: "40%" }}>
            Crea tu cuenta de voluntario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionRegistraVoluntario;

