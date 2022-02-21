/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/App.css';
import AppLogin from './AppLogin'
import AppMainScreen from './AppMainScreen'
import React, { useState } from "react";
import { AppContextAuth } from "../lib/contextLibAuth";
import * as ROSLIB from 'roslib';


var ros = new ROSLIB.Ros({
    url: 'ws://192.168.1.63:9090' // Connexion Réseau AIP
})

function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false); // Vérifie si l'opérateur a réussi à se connecter ou non
    const [modeCo, setModeCo] = useState(0); // Mode de connexion de l'opérateur : 0 - Utilisateur Lambda | 1 - Administrateur | 2 - Maintenance

    //MAIN CONNEXION RESEAU AIP ROS
    const [isConnectedROS, setIsConnectedROS] = useState(false);
    if (isConnectedROS === false) {
        // Fonction appelée une fois la connexion établie
        ros.on('connection', function () {
            console.log('Connected to websocket server.');
            setIsConnectedROS(true);
        });
        // Fonction appelée en cas d'erreur de connexion
        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });
        // Fonction appelée une fois la connexion fermée
        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
            setIsConnectedROS(false);
        });
    }

    // Si l'opérateur est connecté on affiche l'écran d'accueil correspondant à son mode de connexion, sinon on affiche l'écran de connexion
    return (
        <AppContextAuth.Provider value={{ isAuthenticated, userHasAuthenticated}}>
            {isAuthenticated ?
                <AppMainScreen modeCo={modeCo} ros={ros}/> :
                <AppLogin modeCo={modeCo} setModeCo={setModeCo} />}
        </AppContextAuth.Provider>

    )
}

export default App;