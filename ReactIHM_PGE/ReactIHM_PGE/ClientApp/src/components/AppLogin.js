import '../styles/AppLogin.css';
import TopBanner from './TopBanner'
import StateBanner from './StateBanner';
import ConnexionScreen from './ConnexionScreen';
import { AppContextWrongID } from "../lib/contextLibWrongID";
import React, { useState } from "react";



function AppLogin({modeCo, setModeCo}) { // login screen
    document.body.id = 'bodyLogin';
    const [wrongIdentification, userHasFailed] = useState(false);

    return (
        <AppContextWrongID.Provider value={{ wrongIdentification, userHasFailed }}>
            {wrongIdentification ?
                <div>
                    <TopBanner />
                    <StateBanner />
                    <ConnexionScreen failed={wrongIdentification} modeCo={modeCo} setModeCo={setModeCo} />
                </div>:
                <div>
                    <TopBanner />
                    <StateBanner />
                    <ConnexionScreen failed={wrongIdentification} modeCo={modeCo} setModeCo={setModeCo} />
                </div> }
        </AppContextWrongID.Provider>
        
  );
 }

export default AppLogin;
