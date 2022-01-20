import '../styles/MiddleScreen.css'
import 'eventemitter2'
import * as ROSLIB from 'roslib';
import noCam from '../assets/NoCamera.png'
import start from '../assets/start.png'
import pause from '../assets/pause.png'
import stop from '../assets/stop.png'
import React, { useState } from 'react';


//// Fonction appelée une fois la connexion établie
//ros.on('connection', function () {
//    console.log('Connected to websocket server.');
//});
//// Fonction appelée en cas d'erreur de connexion
//ros.on('error', function (error) {
//    console.log('Error connecting to websocket server: ', error);
//});
//// Fonction appelée une fois la connexion fermé
//ros.on('close', function () {
//    console.log('Connection to websocket server closed.');
//});

//function callbackImage(message) {
//    // Log console
//    console.log('Received message on ' + image_listener.name);

//    // Récupération du canvas sur la pages
//    var canvas = document.getElementById('img_ROS');
//    if (canvas !== null) {
//        var ctx = canvas.getContext('2d');

//        // Création d'une image
//        var image = new Image();

//        // Fonction pour déssiner l'image sur le canvas dès son chargement
//        image.onload = function () {
//            ctx.drawImage(image, 0, 0, 800, 500);
//        };

//        // Récupération de l'image dans le message ROS (data) et conversion en image PNG 
//        image.src = `data:image/png;base64,${message.data}`;
//    } else {
//        console.log("canvas null");
//    }
//}

//// Création du listener ROS
//var image_listener = new ROSLIB.Topic({
//    ros: ros,
//    name: '/image/compressed', // Choix du topic
//    messageType: 'sensor_msgs/CompressedImage' // Type du message transmis
//});
//image_listener.subscribe(callbackImage);
//// Affectation de la fonction de callback


function MiddleScreen({ actionEnCours, setActionEnCours, actionRunning, setActionRunning, setDecoDisabled }) {

    const [isPaused, setIsPaused] = useState(false);

    function startAction() {
        if (isPaused) {
            setIsPaused(!isPaused);
        }
    }

    function pauseAction() {
        if (!isPaused) {
            setIsPaused(!isPaused);
        }
    }

    function stopAction() {
        setActionRunning(false);
        setActionEnCours("Aucune action en cours");
        setDecoDisabled(false);
        setIsPaused(false);
    }

    function getClassNameStartButton() {
        if (actionRunning && !isPaused) {
            return 'bouton-runmode-disabled';
        } else {
            return 'bouton-runmode';
        }
    }

    function getClassNamePauseButton() {
        if (isPaused) {
            return 'bouton-runmode-disabled';
        } else {
            return 'bouton-runmode';
        }
    }

    return (
       /* <div className='middle'>
            <canvas id="img_ROS" width="800" height="500" className="img-noCamera"></canvas>
        </div> */
        <div className='middle'>
            {actionRunning === true ?
                <div className='middle-run'>
                    <div className='run-buttons'>
                        <span className='space-button-runmode'>
                            <img src={start} alt='bouton start' className={getClassNameStartButton()} onClick={startAction} />
                        </span>
                        <span className='space-button-runmode'>
                            <img src={pause} alt='bouton pause' className={getClassNamePauseButton()} onClick={pauseAction} />
                        </span>
                        <img src={stop} alt='bouton stop' className='bouton-runmode-stop' onClick={stopAction} />
                    </div>
                    <div className='run-console'>
                        <div className='run-console-text'>• Caméra calibrée...   OK</div>
                        <br />
                        <div className='run-console-text'>• Action en cours...</div>
                    </div>
                </div>
                : <img src={noCam} alt="No available image" className="img-demonstrateur" />}
        </div>
    )
}
export default MiddleScreen
