import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const DashboardVoluntario = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

return (
<h1>
    Bienvenido a tu Dashboard
</h1>
    );
};