import '../styles/Configuration.css'
import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { AiFillSafetyCertificate, AiFillVideoCamera } from "react-icons/ai";
import { GiRobotGrab, GiMetalPlate} from "react-icons/gi";
import { useFilePicker } from 'use-file-picker'
import Popup from './PopUp'
import PopUpConfirm from './PopUpConfirm'
import confirm from '../assets/confirm.png'
import cancel from '../assets/cancel.png'
import defaultFile from '../assets/default.csv'
import { readString } from 'react-papaparse';
import 'eventemitter2';
import * as ROSLIB from 'roslib';
import { CSVLink, CSVDownload } from "react-csv";
import start from '../assets/start.png';
import pause from '../assets/pause.png';
import stop from '../assets/stop.png';
// import { moveFile } from 'move-file';
//import * as RNFS from 'react-native-fs';

function Configuration({ isDecoDisabled, setDecoDisabled, actionEnCours, setActionEnCours, actionRunning, setActionRunning, modeCo, selectedTest, setSelectedTest, testRunning, setTestRunning, memAction, setMemAction, ros}) {
    const [msg_act_courante, setMsgActCourante] = useState("");
    const [etatRobotActuel, setEtatRobotActuel] = useState("LIBRE INIT"); // Etats possibles : LIBRE INIT/ LIBRE NON INIT/ EN PRODUCTION / STOPPE/ INITIALISATION
    const [etatCamActuel, setEtatCamActuel] = useState("EN MARCHE"); // Etats possibles : ETEINTE / EN MARCHE 
    const [etatSecuriteActuel, setEtatSecuriteActuel] = useState("OK"); // Etats possibles : NOK / OK
    const [etatPlaqueActuel, setEtatPlaqueActuel] = useState("INCONNU"); // Etats possibles : INCONNU / NOK / OK
    const [subscribed, setSubscribed] = useState(false);
    // var RNFS = require("react-native-fs");
            
    // Récupération du topic sur lequel on veut publier
    var message_ihm_run = new ROSLIB.Topic({
        ros: ros,
        name: '/message_ihm_run',
        messageType: 'motoman_hc10_moveit_config/IHM_msg'
    });

    // ROS ETAT ROBOT
    function callbackEtatRobot(message) {
        // Log console
        //console.log('Received message on ' + robot_state_listener.name);
        // Récupération de la valeur de l'état du robot
        //console.log(message.data);
        setEtatRobotActuel(message.data);

    }
    // Création du listener ROS Etat Robot
    var robot_state_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/robot_state', // Choix du topic
        messageType: 'std_msgs/String' // Type du message transmis
    });
    if (subscribed === false) {
        robot_state_listener.subscribe(callbackEtatRobot);
        setSubscribed(true);
    }

    // ROS ETAT CAMERA
    function callbackEtatCam(message) {
        // Log console
        //console.log(message.data);
        setEtatCamActuel(message.data);

    }
    // Création du listener ROS Etat Camera
    var cam_state_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/cam_state', // Choix du topic
        messageType: 'std_msgs/String' // Type du message transmis
    });
    if (subscribed === false) {
        cam_state_listener.subscribe(callbackEtatCam);
        setSubscribed(true);
    }

    //ROS ETAT SECURITE
    function callbackEtatSecurite(message) {
        // Log console
        //console.log(message.data);
        setEtatSecuriteActuel(message.data);

    }
    // Création du listener ROS Etat Securite
    var securite_state_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/securite_state', // Choix du topic
        messageType: 'std_msgs/String' // Type du message transmis
    });
    if (subscribed === false) {
        securite_state_listener.subscribe(callbackEtatSecurite);
        setSubscribed(true);
    }

    //ROS ETAT PLAQUE
    function callbackEtatPlaque(message) {
        // Log console
        //console.log(message.data);
        setEtatPlaqueActuel(message.data);

    }
    // Création du listener ROS Etat Plaque
    var plaque_state_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/plaque_state', // Choix du topic
        messageType: 'std_msgs/String' // Type du message transmis
    });
    if (subscribed === false) {
        plaque_state_listener.subscribe(callbackEtatPlaque);
        setSubscribed(true);
    }
    //}

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({ multiple: false, accept: ['.csv'] })

    //Gestion séléction configuration
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedPlaque, setSelectedPlaque] = useState("");
    const [selectedDiam, setSelectedDiam] = useState("");
    const [rangevalConf, setRangevalConf] = useState(0);
    const [cpt, setCpt] = useState(0);
    const [nameFileImp, setNameFileImp] = useState("default");
    // Gestion sélection test (maintenance)
    const [selectedTestList, setSelectedTestList] = useState("");
    const [testPaused, setTestPaused] = useState(false);

    //Gestion des POPUPS
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        if (isOpen === true || actionRunning === false) {
            setActionEnCours("Aucune action en cours");
        }
        setIsOpen(!isOpen);
        setIsOpenAnnuler(false);
        setDecoDisabled(!isDecoDisabled);
    }

    const [isOpenAnnuler, setIsOpenAnnuler] = useState(false);
    const togglePopupAnnuler = () => {
        setIsOpenAnnuler(!isOpenAnnuler);
    }

    //Default configuration file
    const [defaultAction, setDefaultAction] = useState("");
    const [defaultPlate, setDefaultPlate] = useState("");
    const [defaultDiam, setDefaultDiam] = useState("");
    const [defaultConf, setDefaultConf] = useState("");
    const [readOnce, setReadOnce] = useState(false);
    function readDefaultFile() {
        if (readOnce === false) {
            const papaConfig = {
                complete: (results, file) => {
                    setDefaultAction(results.data[1][0]);
                    setSelectedAction(defaultAction);
                    setDefaultPlate(results.data[1][1]);
                    setSelectedPlaque(defaultPlate);
                    setDefaultDiam(results.data[1][2]);
                    setCheckedDiam(defaultDiam);
                    setDefaultConf(results.data[1][3]);
                    setRangevalConf(defaultConf);
                    setReadOnce(true);
                },
                download: true,
                error: (error, file) => {
                    //console.log('Error while parsing:', error, file);
                },
            };
            readString(defaultFile, papaConfig);

        }
    }
    //Import/Export fichier .csv
    const csvFileCreator = require('csv-file-creator');
    // Import fichier
    function importFile() {
        setCpt(0);
        setSelectedAction(defaultAction);
        setSelectedPlaque(defaultPlate);
        setCheckedDiam(defaultDiam);
        setRangevalConf(defaultConf);
        setNameFileImp("default");
        openFileSelector();
    }
    function getImportedFileContent() {
        const tmp = filesContent[0].content;
        const tmp_split = tmp.split("\n");
        const ctnt = tmp_split[1].split(",");
        const ctnt_action = ctnt[0].split("\"")[1];
        const ctnt_plaque = ctnt[1].split("\"")[1];
        const ctnt_diam = ctnt[2].split("\"")[1];
        const ctnt_conf = ctnt[3].split("\r")[0].split("\"")[1];

        setSelectedAction(ctnt_action);
        setSelectedPlaque(ctnt_plaque);
        setCheckedDiam(ctnt_diam);
        setRangevalConf(ctnt_conf);

        if (ctnt_action === "Localiser la plaque") {
            setCheckedDiam(defaultDiam);
            setRangevalConf(defaultConf);
        } else if (ctnt_action === "Deplacer le robot") {
            setRangevalConf(defaultConf);
        }
        
        // file name
        setNameFileImp(plainFiles[0].name);
        setCpt(1);
        clear();
    }

    function backToConfigDefault() {
        setCpt(0);
        setSelectedAction(defaultAction);
        setSelectedPlaque(defaultPlate);
        setCheckedDiam(defaultDiam);
        setRangevalConf(defaultConf);
        setNameFileImp("default");
    }
    

    function saveConfig() {
        if (selectedAction === "Localiser la plaque") {
            var csv_data = [
                ['Action', 'TypePlaque', 'Diam', 'TauxConf'],
                [selectedAction, selectedPlaque, "", ""]
            ];
        } else if (selectedAction === "Déplacer le robot") {
            var csv_data = [
                ['Action', 'TypePlaque', 'Diam', 'TauxConf'],
                [selectedAction, selectedPlaque, selectedDiam, ""]
            ];
        } else {
            var csv_data = [
                ['Action', 'TypePlaque', 'Diam', 'TauxConf'],
                [selectedAction, selectedPlaque, selectedDiam, rangevalConf]
            ];
        }
        
        csvFileCreator('config.csv', csv_data);
       
    }

    function saveConfigDefault() {
        setDefaultAction(selectedAction);
        setDefaultPlate(selectedPlaque);
        setDefaultDiam(selectedDiam);
        setCheckedDiam(selectedDiam);
        setDefaultConf(rangevalConf);
    }


    function selectAll() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var allAlreadySelected = true;
        for (var checkbox of checkboxes) {
            if (checkbox.checked === false) {
                allAlreadySelected = false;
            }
        }
        if (!allAlreadySelected) {
            for (var checkbox of checkboxes) {
                checkbox.checked = true;
            }
        } else {
            for (var checkbox of checkboxes) {
                checkbox.checked = false;
            }
        }
        setCheckedDiam("");
    }

    function setCheckedDiam(ctnt) {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        try {
            if (ctnt != "") {
                const diff_diam = ctnt.split("-");
                for (var checkbox of checkboxes) {
                    var bool = false;
                    for (var diam of diff_diam) {
                        if (diam === checkbox.value) {
                            checkbox.checked = true;
                            bool = true;
                        }
                    }
                    if (bool === false) {
                        checkbox.checked = false;
                    }
                }
            }
            var str = "";
            for (var checkbox of checkboxes) {
                if (checkbox.checked === true) {
                    if (str === "") {
                        str += checkbox.value;
                    } else {
                        str += "-" + checkbox.value;
                    }
                }
            }
            setSelectedDiam(str);
        } catch {
            var str = "";
            for (var checkbox of checkboxes) {
                if (checkbox.checked === true) {
                    if (str === "") {
                        str += checkbox.value;
                    } else {
                        str += "-" + checkbox.value;
                    }
                }
            }
            setSelectedDiam(str);
            setNameFileImp("new config");
        }
    }

    function configValid() {
        if (isOpen || selectedAction === "" || actionRunning) {
            return false;
        } else if (selectedAction === "Localiser la plaque") {
            return selectedPlaque !== "";
        } else {
            return selectedPlaque !== "" && selectedDiam !== "";
        }        
    }

    function disableRun() {
        return !configValid() || !(etatRobotActuel === "LIBRE INIT" && etatCamActuel === "EN MARCHE" && etatSecuriteActuel === "OK");
    }

    function handleSelectAction(event) {
        event.preventDefault();
        setSelectedAction(event.target.value);
        setNameFileImp("new config");
    }

    function handleSelectPlaque(event) {
        event.preventDefault();
        setSelectedPlaque(event.target.value);
        setNameFileImp("new config");
    }

    function handleSelectTest(event) {
        event.preventDefault();
        setSelectedTestList(event.target.value);
    }

    function disableGeneral() {
        return isOpen || actionRunning;
    }
    function disableDiam() {
        return selectedAction === "Localiser la plaque" || isOpen || actionRunning;
    }
    function disableConf() {
        return selectedAction === "Localiser la plaque" || selectedAction === "Deplacer le robot" || isOpen || actionRunning;
    }
    function disableTest() {
        return testRunning;
    }

    function getClassNameDisConf() {
        if (selectedAction === "Localiser la plaque" || selectedAction === "Deplacer le robot" || isOpen || actionRunning) {
            return 'value-conf-disabled';
        } else {
            return 'value-conf';
        }
    }

    function getClassNameDisDiam() {
        if (selectedAction === "Localiser la plaque" || isOpen || actionRunning) {
            return 'value-diam-disabled';
        } else {
            return 'value-diam';
        }
    }

    function runAction() {
        togglePopup();
        if (selectedAction === "Deplacer le robot") {
            setActionEnCours("Déplacement du robot en cours...");
            setMsgActCourante("Déplacement du robot en cours...");
            setMemAction("Deplacer le robot");
        } else if (selectedAction === "Identifier") {
            setActionEnCours("Identification en cours...");
            setMsgActCourante("Identification en cours...");
            setMemAction("Identifier");
        } else if (selectedAction === "Verifier conformite") {
            setActionEnCours("Vérification de la conformité en cours...");
            setMsgActCourante("Vérification de la conformité en cours...");
            setMemAction("Verifier conformite");
        } else if (selectedAction === "Localiser la plaque") {
            setActionEnCours("Localisation de la plaque en cours...");
            setMsgActCourante("Localisation de la plaque en cours...");
            setMemAction("Localiser la plaque");
        }

        // Création du message à envoyer
        var msg = new ROSLIB.Message({
            action: String(selectedAction),
            plaque: String(selectedPlaque),
            diametre: String(selectedDiam),
            confiance: String(rangevalConf)
        });
        message_ihm_run.publish(msg);
        setActionRunning(true);
        setDecoDisabled(true);
    }

    function goToInitPos() {
        var goToInit = new ROSLIB.Service({
            ros: ros,
            name: '/move_robot_init',
            serviceType: 'motoman_hc10_moveit_config/Robot_move_predef'
        });
        var request = null;
        goToInit.callService(request, function (result) { });
    }


    function nothing() { }

    function launchCalibration() {
        alert("TODO : prompt calibration camera");
    }

    function setConf(event) {
        setRangevalConf(event.target.value);
        setNameFileImp("new config");
    }

    function startTest() {
        if (selectedTestList !== "") {
            setTestRunning(true);
            if (testPaused) {
                setTestPaused(!testPaused);
            }
            setDecoDisabled(true);
            setSelectedTest(selectedTestList);
        }
    }

    function pauseTest() {
        if (selectedTestList !== "") {
            if (!testPaused) {
                setTestPaused(!testPaused);
            }
        }
    }

    function stopTest() {
        if (selectedTestList !== "") {
            setTestRunning(false);
            setDecoDisabled(false);
            setSelectedTestList("");
            setSelectedTest("");
        }
    }

    function getClassNameStart() {
        if ((testRunning && !testPaused)||selectedTestList==="") {
            return 'bouton-start-mtnc-disabled';
        } else {
            return 'bouton-start-mtnc';
        }
    }

    function getClassNamePause() {
        if ((testRunning && testPaused) || selectedTestList === "" || !testRunning) {
            return 'bouton-pause-mtnc-disabled';
        } else {
            return 'bouton-pause-mtnc';
        }
    }

    function getClassNameStop() {
        if (selectedTestList === "" || !testRunning) {
            return 'bouton-stop-mtnc-disabled';
        } else {
            return 'bouton-stop-mtnc';
        }
    }

    function getClassNameEtatCourant() {
        if (modeCo === 0) {
            return "etat-courant";
        } else if (modeCo === 1) {
            return "etat-courant-admin";
        }
    }

    if (modeCo !== 2) {

        return (
            <div className="config">
                <h3> CONFIGURATION</h3>
                {readOnce ? nothing() : readDefaultFile()}
                <span className="champImport"><button type="button" className="bouton-import" onClick={importFile} disabled={disableGeneral()}>Importer une configuration</button></span>
                {nameFileImp != "" ? <span className="import-ok">{nameFileImp}</span> : <div className="import-ok"><br /></div>}
                {plainFiles.length > 0 && cpt == 0 ? getImportedFileContent() : nothing()}
                <div className='champ'><label className='labels'>Action :</label>
                    <select value={selectedAction} onChange={handleSelectAction} disabled={disableGeneral()}>
                        <option selected disabled hidden value="">-----</option>
                        <option value="Localiser la plaque">Localiser la plaque</option>
                        <option value="Identifier">Identifier</option>
                        <option value="Verifier conformite">Vérifier conformité</option>
                        <option value="Deplacer le robot">Déplacer le robot</option>
                    </select>
                </div>
                <div className='champ'><label className='labels'>Type de plaque :</label>
                    <select value={selectedPlaque} onChange={handleSelectPlaque} disabled={disableGeneral()}>
                        <option selected disabled hidden value="">-----</option>
                        <option value="Tole plate">Tôle plate</option>
                        <option value="Tole cintree">Tôle cintrée</option>
                        <option value="Tole epaisse">Tôle épaisse</option>
                    </select>
                </div>
                <div className='champ'>
                    <label className='labels'><span className={getClassNameDisDiam()}>Diamètre des trous :</span></label>
                    <input type="button" className="bouton-select" onClick={selectAll} id="boutonSelect" value="Tout sélectionner/déselectionner" disabled={disableDiam()}></input>
                    <div className='champCheck'>
                        <label className={getClassNameDisDiam()}>
                            <input type="checkbox" disabled={disableDiam()} value="5" onChange={setCheckedDiam} />
                            5 mm
                        </label>
                        <label className={getClassNameDisDiam()}>
                            <input type="checkbox" disabled={disableDiam()} value="7" onChange={setCheckedDiam} />
                            7 mm
                        </label>
                        <label className={getClassNameDisDiam()}>
                            <input type="checkbox" disabled={disableDiam()} value="12" onChange={setCheckedDiam} />
                            12 mm
                        </label>
                        <label className={getClassNameDisDiam()}>
                            <input type="checkbox" disabled={disableDiam()} value="18" onChange={setCheckedDiam} />
                            18 mm
                        </label>
                    </div>
                </div>
                <div className='champ-slider'>
                    <div className='slider'><label className='labels'><span className={getClassNameDisConf()}>Taux de confiance minimum :</span></label>
                        <span className={getClassNameDisConf()}>{rangevalConf} %</span>
                        <br /><br />
                        <input value={rangevalConf} type="range" min="0" max="100" className="slider" id="myRange" step="1" onChange={(event) => setConf(event)} disabled={disableConf()}></input>
                    </div>
                </div>
                {modeCo === 1 ?
                    <div className="bouton-group">
                        <button type="button" className="bouton-normal-mid" onClick={saveConfig} disabled={!configValid()}>Sauvegarder</button>
                        <button type="button" className="bouton-normal-mid" onClick={saveConfigDefault} disabled={!configValid()} id='saveConfDef'>Sauvegarder comme Config Défaut</button>
                    </div>
                    : <button type="button" className="bouton-normal" onClick={saveConfig} disabled={!configValid()}>Sauvegarder</button>
                }
                <button type="button" className="bouton-normal" disabled={disableGeneral()} onClick={backToConfigDefault}>Configuration par défaut</button>
                <button type="submit" className="bouton-run" onClick={togglePopup} disabled={disableRun()}>Run</button>
                {isOpen && <Popup
                    content={<>
                        <h3 className="popup-title">Lancement de l'action</h3>
                        <p className="popup-recap-title"> Récapitulatif de la configuration </p>
                        <p className="popup-element"> Action choisie : {selectedAction}</p>
                        <p className="popup-element"> Type de la plaque : {selectedPlaque} </p>
                        {(selectedAction === "Localiser la plaque") ? <span></span> : <p className="popup-element"> Diamètre(s) des trous : {selectedDiam} </p>}
                        {(selectedAction === "Localiser la plaque" || selectedAction === "Deplacer le robot") ? <span></span> : <p className="popup-element"> Taux de confiance minimum : {rangevalConf} %</p>}
                        <div className='img-pause-stop'>
                            <img src={cancel} alt='bouton annuler' className='bouton-cancel' onClick={togglePopupAnnuler} />
                            {isOpenAnnuler && <PopUpConfirm
                                content={<>
                                    <h3 className="popup-title">Voulez-vous annuler l'action choisie ?</h3>
                                    <button className="bouton-popupConfirm-oui" onClick={togglePopupAnnuler, togglePopup}>Oui</button>
                                    <button className="bouton-popupConfirm-non" onClick={togglePopupAnnuler}>Non</button>
                                </>}
                            />}
                            <span className='espace-boutons' />
                            <img src={confirm} alt='bouton confirmer l action' className='bouton-confirm' onClick={runAction} />
                        </div>
                    </>}
                />}

                <div className={getClassNameEtatCourant()}>
                    <div className='etat-col-1'>
                        <div className='etat-import'>
                            <AiFillSafetyCertificate className="icone" />
                            Sécurité :
                            {etatSecuriteActuel === "NOK" ? <span className='rep-stop'>{etatSecuriteActuel}</span> : <span className='rep'>{etatSecuriteActuel}</span>}
                            
                        </div>
                        <div className='etat-import'>
                            <GiRobotGrab className="icone" />
                            Etat du robot :

                            {(etatRobotActuel === "EN PRODUCTION" || etatRobotActuel === "INITIALISATION") ? <span className='rep-occ'>{etatRobotActuel} </span> : (etatRobotActuel === "STOPPE" || etatRobotActuel === "DECONNECTE") ? <span className='rep-stop'>{etatRobotActuel}</span>
                                : etatRobotActuel === "LIBRE NON INIT" ? <span className='rep-non-init'>{etatRobotActuel}</span> : <span className='rep'>{etatRobotActuel}</span>}
                        </div>
                        <div className='wrap-bouton-parking'>
                            <button type="button" className="bouton-normal" disabled={etatRobotActuel !== "LIBRE NON INIT"} onClick={goToInitPos}>Déplacer en position initiale</button>
                        </div>
                    </div>
                    <div className='etat-col-2'>
                        <div className='etat-import'>
                            <   AiFillVideoCamera className="icone" />
                            Etat caméra :
                            {etatCamActuel === "EN MARCHE" ? <span className='rep'>{etatCamActuel}</span> : <span className='rep-stop'>{etatCamActuel}</span> }
                        </div>
                        <div className='etat-import'>
                            <GiMetalPlate className="icone" />
                            Plaque détectée :
                            {etatPlaqueActuel === "INCONNU" ? <span className='rep-non-init'>{etatPlaqueActuel}</span> : etatPlaqueActuel === "OK" ? <span className='rep'>{etatPlaqueActuel}</span> : <span className='rep-stop'>{etatPlaqueActuel}</span> }
                        </div>
                    </div>
                </div>


            </div>
        )
    } else {
        // MAINTENANCE MODE ---------------------------------------------------------------------------------------------------

        return (
            <div className="config">
                <h3> TESTS DES FONCTIONNALITES </h3>

                <span className="champCalibration"><button type="button" className="bouton-calibration-mtnc" onClick={launchCalibration} disabled={etatCamActuel==="ETEINTE"}>Calibrer la caméra</button></span>

                <div className='champ-mtnc'><label className='labels-mtnc'>Choix du pôle à évaluer :</label>
                    <select value={selectedTestList} onChange={handleSelectTest} disabled={disableTest()}>
                        <option selected disabled hidden value="">-----</option>
                        <option value="Localisation">Pôle localisation de la plaque</option>
                        <option value="Identification">Pôle identification des trous</option>
                        <option value="Controle Qualite">Pôle contrôle conformité</option>
                        <option value="Deplacement Robot">Pôle déplacement du robot</option>
                    </select>
                </div>


                <div className='run-buttons-mtnc'>
                    <span className='space-button-mtnc'>
                        <img src={start} alt='bouton start' className={getClassNameStart()} onClick={startTest} />
                    </span>
                    <span className='space-button-mtnc'>
                        <img src={pause} alt='bouton pause' className={getClassNamePause()} onClick={pauseTest} />
                    </span>
                    <img src={stop} alt='bouton stop' className={getClassNameStop()} onClick={stopTest} />
                </div>

                <div className='etat-courant-maintenance'>
                    <div className='etat-col-1'>
                        <div className='etat-import'>
                            <AiFillSafetyCertificate className="icone" />
                            Sécurité :
                            {etatSecuriteActuel === "NOK" ? <span className='rep-stop'>{etatSecuriteActuel}</span> : <span className='rep'>{etatSecuriteActuel}</span>}
                        </div>
                        <div className='etat-import'>
                            <GiRobotGrab className="icone" />
                            Etat du robot :

                            {(etatRobotActuel === "EN PRODUCTION" || etatRobotActuel === "INITIALISATION") ? <span className='rep-occ'>{etatRobotActuel} </span> : (etatRobotActuel === "STOPPE" || etatRobotActuel === "DECONNECTE") ? <span className='rep-stop'>{etatRobotActuel}</span>
                                : etatRobotActuel === "LIBRE NON INIT" ? <span className='rep-non-init'>{etatRobotActuel}</span> : <span className='rep'>{etatRobotActuel}</span>}
                        </div>
                        <div className='wrap-bouton-parking'>
                            <button type="button" className="bouton-normal" disabled={etatRobotActuel !== "LIBRE NON INIT"} onClick={goToInitPos}>Déplacer en position initiale</button>
                        </div>
                    </div>
                    <div className='etat-col-2'>
                        <div className='etat-import'>
                            <   AiFillVideoCamera className="icone" />
                            Etat caméra :
                            {etatCamActuel === "EN MARCHE" ? <span className='rep'>{etatCamActuel}</span> : <span className='rep-stop'>{etatCamActuel}</span>}
                        </div>
                        <div className='etat-import'>
                            <GiMetalPlate className="icone" />
                            Plaque détectée :
                            {etatPlaqueActuel === "INCONNU" ? <span className='rep-non-init'>{etatPlaqueActuel}</span> : etatPlaqueActuel === "OK" ? <span className='rep'>{etatPlaqueActuel}</span> : <span className='rep-stop'>{etatPlaqueActuel}</span>}
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Configuration;
