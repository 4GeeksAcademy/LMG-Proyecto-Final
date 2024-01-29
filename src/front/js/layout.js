import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { Voluntarios } from "./pages/voluntarios";
import { OngForm } from "./pages/addOng";
import { OngEditForm } from "./pages/editOng";
import { Ong } from "./pages/ong";
import { OngLogin } from "./pages/ongLogin";
import { TuOng } from "./pages/tuOng";
import { CampaignForm } from "./pages/addCampaign";
import { CampaignEditForm } from "./pages/editCampaign";
import { Campaign } from "./pages/campaign";
import { AdminLogin} from "./pages/adminLogin";
import { AdminSignup } from "./pages/adminSignup";
import { Admin } from "./pages/admin";
import { Single } from "./pages/single";
import { AddForm } from "./pages/addVoluntario";
import { EditVoluntario } from "./pages/editVoluntario";
import { VoluntarioLogin } from "./pages/voluntarioLogin";
import { VoluntarioSignup } from "./pages/voluntarioSignup";
import { VoluntarioDashboard } from "./pages/voluntarioDashboard";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />

                        <Route element={<Voluntarios />} path="/voluntarios" />
                        <Route path="/addOng" element={<OngForm />} />
                        <Route path="/editOng/:theid" element={<OngEditForm />} />
                        <Route element={<Ong />} path="/ong" />
                        <Route path="/ongLogin" element={<OngLogin />} />
                        <Route path="/tuOng/:theid" element={<TuOng />} />
                        <Route path="/addCampaign" element={<CampaignForm />} />
                        <Route path="/editCampaign/:theid" element={<CampaignEditForm />} />
                        <Route element={<Campaign />} path="/campaign" />
                        <Route path="/adminLogin" element={<AdminLogin />} />
                        <Route path="/adminSignup" element={<AdminSignup />} />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/editVoluntario/:theid" element={<EditVoluntario />} />
                        <Route path="/addVoluntario" element={<AddForm />} />
                        <Route path="/voluntarioLogin" element={<VoluntarioLogin />} />
                        <Route path="/voluntarioSignup" element={<VoluntarioSignup />} />
                        <Route path="/voluntarioDashboard/:theid" element={<VoluntarioDashboard />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);