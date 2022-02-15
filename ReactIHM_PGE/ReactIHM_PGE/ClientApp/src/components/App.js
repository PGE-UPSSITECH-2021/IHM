/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Ana�s MONDIN
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
    url: 'ws://192.168.1.63:9090' // AIP
    //url: 'ws://192.168.137.80:9090' // Alexandre PC
})

function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [modeCo, setModeCo] = useState(0);

    //MAIN CONNEXION RESEAU AIP ICI
    const [isConnectedROS, setIsConnectedROS] = useState(false);
    if (isConnectedROS === false) {
        // Fonction appel�e une fois la connexion �tablie
        ros.on('connection', function () {
            console.log('Connected to websocket server.');
            setIsConnectedROS(true);
        });
        // Fonction appel�e en cas d'erreur de connexion
        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });
        // Fonction appel�e une fois la connexion ferm�
        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
            setIsConnectedROS(false);
        });
    }

    /*const { remote } = require('electron');
    remote.getCurrentWindow().on('close', (e) => {
        alert("DISCONNECTING FROM ROS");
        ros.close();
    });*/

    return (
        <AppContextAuth.Provider value={{ isAuthenticated, userHasAuthenticated}}>
            {isAuthenticated ?
                <AppMainScreen modeCo={modeCo} ros={ros}/> :
                <AppLogin modeCo={modeCo} setModeCo={setModeCo} />}
        </AppContextAuth.Provider>

    )
}

export default App;