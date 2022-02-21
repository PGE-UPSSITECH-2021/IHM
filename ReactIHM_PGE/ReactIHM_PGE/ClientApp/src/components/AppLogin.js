/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/AppLogin.css';
import TopBanner from './TopBanner'
import StateBanner from './StateBanner';
import ConnexionScreen from './ConnexionScreen';
import { AppContextWrongID } from "../lib/contextLibWrongID";
import React, { useState } from "react";


function AppLogin({modeCo, setModeCo, ros}) { // Ecran de connexion
    document.body.id = 'bodyLogin';
    const [wrongIdentification, userHasFailed] = useState(false); // Vérifie si l'utilisateur a échoué une tentative de connexion

    return (
        <AppContextWrongID.Provider value={{ wrongIdentification, userHasFailed }}>
            <div>
                <TopBanner />
                <StateBanner />
                <ConnexionScreen failed={wrongIdentification} modeCo={modeCo} setModeCo={setModeCo} />
            </div>:
        </AppContextWrongID.Provider>
        
  );
 }

export default AppLogin;
