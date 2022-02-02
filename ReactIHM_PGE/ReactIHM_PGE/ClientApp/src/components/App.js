import '../styles/App.css';
import AppLogin from './AppLogin'
import AppMainScreen from './AppMainScreen'
import React, { useState, useEffect } from "react";
import { AppContextAuth } from "../lib/contextLibAuth";

function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [modeCo, setModeCo] = useState(0);
    
    return (
        <AppContextAuth.Provider value={{ isAuthenticated, userHasAuthenticated}}>
            {isAuthenticated ?
                <AppMainScreen modeCo={modeCo} setModeCo={setModeCo}/> :
                <AppLogin modeCo={modeCo} setModeCo={setModeCo} />}
        </AppContextAuth.Provider>

    )
}

export default App;