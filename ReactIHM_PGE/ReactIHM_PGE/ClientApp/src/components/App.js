import '../styles/App.css';
import AppLogin from './AppLogin'
import AppMainScreen from './AppMainScreen'
import React, { useState } from "react";
import { AppContextAuth } from "../lib/contextLibAuth";


function App() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    
    return (
        <AppContextAuth.Provider value={{ isAuthenticated, userHasAuthenticated}}>
            {isAuthenticated ?
                <AppMainScreen /> :
                <AppLogin /> }
        </AppContextAuth.Provider>

    )
}

export default App;