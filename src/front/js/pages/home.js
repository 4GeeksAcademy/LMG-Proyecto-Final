import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import SectionRegistraONG from '../component/sectionRegistraOng'; // Adjust the path accordingly
import SectionRegistraVoluntario from '../component/sectionRegistraVoluntario'; // Adjust the path accordingly
import SectionHeroBanner from '../component/sectionHeroBanner'; // Adjust the path accordingly
import SectionCampaigns from '../component/sectionCampaigns'; // Adjust the path accordingly


import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
        <SectionHeroBanner/>
        <SectionCampaigns/>
        <SectionRegistraVoluntario/>
        <SectionRegistraONG />
        </div>
    );
};