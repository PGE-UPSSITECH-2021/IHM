/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

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
        var actionOK = message.actionOK;
        var infoErreur = message.erreur;
        if (actionOK === true) {
            console.log("ACTION FINIE SS ERREUR");
            setActionRunning(false);
            setActionEnCours("Aucune action en cours");
            setDecoDisabled(false);
            setIsPaused(false);
            setShowHistory(false);
            setCurrentPage(1);
        } else {
            console.log("ACTION FINIE AC ERREUR");
            alert("ERREUR : ".concat('\n', infoErreur)); 
            setActionRunning(false);
            setActionEnCours("Aucune action en cours");
            setDecoDisabled(false);
            setIsPaused(false);
            setShowHistory(false);
            setCurrentPage(0);
        }  
       
    }
    // Création du listener ROS Resultats 
    var fin_action_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/result', // Choix du topic
        messageType: 'deplacement_robot/Result' // Type du message transmis
    });
    if (subscribed === false) {
        fin_action_listener.subscribe(callbackFinAction);
        setSubscribed(true);
    }

    // Pour affichage déroulement action sur la console
    const [subscribedAct, setSubscribedAct] = useState(false);
    var tmp_textConsole = "";
    const [textConsole, setTextConsole] = useState(tmp_textConsole);

    // ROS RECEPTION DEROULEMENT ACTION
    function callbackEvolutionAction(message) {
        tmp_textConsole = tmp_textConsole.concat('\r\n',String(message.data));
        setTextConsole(tmp_textConsole);
    }
    // Création du listener ROS Resultats Identification
    var evol_action_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/production_state', // Choix du topic
        messageType: 'std_msgs/String' // Type du message transmis
    });
    if (subscribedAct === false) {
        evol_action_listener.subscribe(callbackEvolutionAction);
        setSubscribedAct(true);
    }

    const [isPaused, setIsPaused] = useState(false);

    // Fonctions pour (re)lancer, pauser ou stopper l'action
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

    // Fonctions pour déterminer le style à appliquer aux boutons run, pause et stop selon si ils sont désactivés ou non
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
        if (selectedTest==="") {
            return 'save-icon-mtnc-disabled';
        } else {
            return 'save-icon-mtnc';
        }
    }

    function saveTestReport() {
        alert("Sauvegarde Rapport de test TODO");
    }

    function delay() { // simulation lancement et fin d'une action
        alert("Action Running");
        setTimeout(function () {}, 3000);
        alert("Action Done");
        setActionRunning(false);
        setActionEnCours("Aucune action en cours");
        setDecoDisabled(false);
        setIsPaused(false);
        setShowHistory(false);
        setCurrentPage(1);
    }

    if (modeCo !== 2) { // modes utilisateur et administrateur

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
                            <div className='run-console-text'>ACTION EN COURS D'EXECUTION</div>
                            <div className='run-console-text'>--------------------------------------</div>
                            <div className='run-console-text'>{textConsole}</div>
                        </div>
                    </div>
                    : <img src={dispositif} alt="Image du dispositif" className="img-demonstrateur" />}
            </div>
        )
    } else { // mode maintenance
        return (
            <div>
                <img src={noCam} alt="No available image" className="flux-video" />
                <div className='console-wrap-mtnc'>
                    <div className='run-console-mtnc'>
                        {(selectedTest === "") ? <div className='run-console-text-mtnc'>Aucun test en cours...</div> :
                            <div className='run-console-text-mtnc'>Evaluation du pôle {selectedTest} en cours...</div> }
                    </div>
                    <div className='wrap-save-icon-mtnc'>
                        <img src={save} className={getClassNameSaveButton()} onClick={saveTestReport}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default MiddleScreen
