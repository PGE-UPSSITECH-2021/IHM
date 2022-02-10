import '../styles/MiddleScreen.css';
import 'eventemitter2';
import * as ROSLIB from 'roslib';
import noCam from '../assets/NoCamera.png';
import dispositif from '../assets/dispositif.jpg'
import start from '../assets/start.png';
import pause from '../assets/pause.png';
import stop from '../assets/stop.png';
import React, { useState } from 'react';
import save from '../assets/save.png';


function MiddleScreen({ currentPage, setCurrentPage, actionEnCours, setActionEnCours, actionRunning, setActionRunning, setDecoDisabled, modeCo, testRunning, setTestRunning, selectedTest, showHistory, setShowHistory, ros }) {

    const [subscribed, setSubscribed] = useState(false);
    // ROS RECEPTION FLAG FIN ACTION
    function callbackFinAction(message) {
        console.log("callback - avant if");
        console.log("ACTION FINIE");
        setActionRunning(false);
        setActionEnCours("Aucune action en cours");
        setDecoDisabled(false);
        setIsPaused(false);
        setShowHistory(false);
        setCurrentPage(1);
    }
    // Création du listener ROS Resultats Identification
    var fin_action_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/result', // Choix du topic
        messageType: 'std_msgs/Bool' // Type du message transmis
    });
    if (subscribed === false) {
        fin_action_listener.subscribe(callbackFinAction);
        setSubscribed(true);
    }

    const [isPaused, setIsPaused] = useState(false);

    function startAction() {
        if (isPaused) {
            setIsPaused(!isPaused);
        }
    }

    function pauseAction() {
        if (!isPaused) {
            setIsPaused(!isPaused);
            delay();
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

    function getClassNameSaveButton() {
        if (selectedTest === "") {
            return 'save-icon-mtnc-disabled';
        } else {
            return 'save-icon-mtnc';
        }
    }

    function saveTestReport() {
        alert("Sauvegarde Rapport de test TODO");
    }

    function delay() {
        alert("Action Running");
        setTimeout(function () { }, 3000);
        alert("Action Done");
        setActionRunning(false);
        setActionEnCours("Aucune action en cours");
        setDecoDisabled(false);
        setIsPaused(false);
        setShowHistory(false);
        setCurrentPage(1);
    }

    if (modeCo !== 2) {
        return (

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
                            <div className='run-console-text'>• Action en cours... </div>
                        </div>
                    </div>
                    : <img src={dispositif} alt="Image du dispositif" className="img-demonstrateur" />}
            </div>
        )
    } else {
        return (
            <div>
                <img src={noCam} alt="No available image" className="flux-video" />
                <div className='console-wrap-mtnc'>
                    <div className='run-console-mtnc'>
                        {(selectedTest === "") ? <div className='run-console-text-mtnc'>Aucun test en cours...</div> :
                            <div className='run-console-text-mtnc'>Evaluation du pôle {selectedTest} en cours...</div>}
                    </div>
                    <div className='wrap-save-icon-mtnc'>
                        <img src={save} className={getClassNameSaveButton()} onClick={saveTestReport} />
                    </div>
                </div>
            </div>
        )
    }
}
export default MiddleScreen