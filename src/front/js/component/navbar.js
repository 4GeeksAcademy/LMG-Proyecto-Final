import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Let me give</span>
				</Link>
				<div className="ml-auto">
					<Link to="/campaign">
						<button className="btn btn-primary">Campaign</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
