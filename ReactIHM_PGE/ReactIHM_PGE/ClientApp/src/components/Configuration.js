import '../styles/Configuration.css'
import React,{ useState } from 'react';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiRobotGrab } from "react-icons/gi";
import { useFilePicker } from 'use-file-picker'
import Popup from './PopUp'
import PopUpConfirm from './PopUpConfirm'
import PopUpEmergency from './PopUpEmergency'
import PopUpPause from './PopUpPause'
import pause from '../assets/pause.png'
import stop from '../assets/stop.png'
import cancel from '../assets/cancel.png'
import 'eventemitter2';
import * as ROSLIB from 'roslib';

function Configuration() {
    const [msg_act_courante, setMsgActCourante] = useState("");

    //ROS
    var ros = new ROSLIB.Ros({
        url: 'ws://192.168.101.172:9090'
    })
    // Récupération du topic sur lequel on veut publier
    var message_ihm_run = new ROSLIB.Topic({
        ros: ros,
        name: '/message_ihm_run',
        messageType: 'test_com/test_msg'
    });

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({ multiple: false, accept: ['.csv'] })


    //Gestion séléction configuration
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedPlaque, setSelectedPlaque] = useState("");
    const [selectedDiam, setSelectedDiam] = useState("");
    const [rangevalConf, setRangevalConf] = useState(50);

    //Gestion des POPUPS
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const togglePopup = () => {
        if (selectedAction === "Deplacer le robot") {
            setMsgActCourante("Déplacement du robot");
        } else if (selectedAction === "Identifier") {
            setMsgActCourante("Identification");
        } else if (selectedAction === "Verifier conformite") {
            setMsgActCourante("Vérification de la conformité");
        } else if (selectedAction === "Localiser la plaque") {
            setMsgActCourante("Localisation de la plaque");
        }
        // Création du message à envoyer
        var msg = new ROSLIB.Message({
            action: String(selectedAction),
            plaque: String(selectedPlaque),
            diametre: String(selectedDiam),
            confiance: String(rangevalConf)
        });
        message_ihm_run.publish(msg);
        setIsOpen(!isOpen);
        setIsOpenConfirm(false);

    }
    const togglePopupConfirm = () => {
        setIsOpenConfirm(!isOpenConfirm);
    }

    const [isOpenEmergency, setIsOpenEmergency] = useState(false);
    const togglePopupEmerg = () => {
        setIsOpen(!isOpen);
        setIsOpenEmergency(false);
    }
    const togglePopupEmergency = () => {
        setIsOpenEmergency(!isOpenEmergency);
    }

    const [isOpenPause, setIsOpenPause] = useState(false);
    const togglePopupHold = () => {
        setIsOpen(!isOpen);
        setIsOpenPause(false);
    }
    const togglePopupPause = () => {
        setIsOpenPause(!isOpenPause);
    }

    //Import/Export fichier .csv
    const csvFileCreator = require('csv-file-creator');

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
        setCheckedDiam();
    }

    function setCheckedDiam() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var str = "";
        for (var checkbox of checkboxes) {
            if (checkbox.checked === true) {
                if (str === "") {
                    str += checkbox.value;
                } else {
                    str += ", " + checkbox.value;
                }
            }
        }
        setSelectedDiam(str);
    }

    function configValid() {
        if (isOpen || selectedAction==="") {
            return false;
        } else if (selectedAction === "Localiser la plaque") {
            return selectedPlaque !== "";
        } else {
            return selectedPlaque !== "" && selectedDiam !== "";
        }        
    }

    function handleSelectAction(event) {
        event.preventDefault();
        setSelectedAction(event.target.value);
    }

    function handleSelectPlaque(event) {
        event.preventDefault();
        setSelectedPlaque(event.target.value);
    }

    function disableGeneral() {
        return isOpen;
    }
    function disableDiam() {
        return selectedAction === "Localiser la plaque" || isOpen;
    }
    function disableConf() {
        return selectedAction === "Localiser la plaque" || selectedAction === "Deplacer le robot" ||isOpen;
    }


    return (
        <div className="config">
            <h3>CONFIGURATION</h3>
            <span className="champImport"><button type="button" className="bouton-import" onClick={() => openFileSelector()} disabled={disableGeneral()}>Importer une configuration</button></span>
            {plainFiles.length > 0 ? <span className="import-ok">{plainFiles[0].name} importé</span> : <div className="import-ok"><br/></div>}
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
                <label className='labels'>Diamètre des trous :</label>
                <input type="button" className="bouton-select" onClick={selectAll} id="boutonSelect" value="Tout sélectionner/déselectionner" disabled={disableDiam()}></input>
                <div className='champCheck'>
                    <label>
                        <input type="checkbox" disabled={disableDiam()} value="5 mm" onChange={setCheckedDiam} />
                        5 mm
                    </label>
                    <label>
                        <input type="checkbox" disabled={disableDiam()} value="7 mm" onChange={setCheckedDiam}/>
                        7 mm
                    </label>
                    <label>
                        <input type="checkbox" disabled={disableDiam()} value="12 mm" onChange={setCheckedDiam}/>
                        12 mm
                    </label>
                    <label>
                        <input type="checkbox" disabled={disableDiam()} value="18 mm" onChange={setCheckedDiam}/>
                        18 mm
                    </label>
                </div>
            </div>
            <div className='champ-slider'>
                <div className='slider'><label className='labels'>Taux de confiance minimum :</label>
                    <span className='value'>{rangevalConf} %</span>
                    <br /><br />
                    <input type="range" defaultValue="50" min="0" max="100" class="slider" id="myRange" step="1" onChange={(event) => setRangevalConf(event.target.value)} disabled={disableConf()}></input>
                    
                </div>
            </div>
            <button type="button" className="bouton-normal" onClick={saveConfig} disabled={!configValid()}>Sauvegarder</button>
            <button type="button" className="bouton-normal" disabled={disableGeneral()}>Configuration par défaut</button>
            <button type="submit" className="bouton-run" onClick={togglePopup} disabled={!configValid()}>Run</button>
            {isOpen && <Popup
                content={<>
                    <h3 className="popup-title">Lancement de l'action</h3>
                    <p className="popup-recap-title"> Récapitulatif de la configuration </p>
                    <p className="popup-element"> Action choisie : {selectedAction}</p>
                    <p className="popup-element"> Type de la plaque : {selectedPlaque} </p>
                    {(selectedAction === "Localiser la plaque") ? <span></span> : <p className="popup-element"> Diamètre(s) des trous : {selectedDiam} </p>}
                    {(selectedAction === "Localiser la plaque" || selectedAction === "Deplacer le robot" ) ? <span></span> : <p className="popup-element"> Taux de confiance minimum : {rangevalConf} %</p>}
                    <div className='img-pause-stop'>
                        <img src={cancel} alt='bouton annuler' className='bouton-cancel' onClick={togglePopupConfirm} />
                        {isOpenConfirm && <PopUpConfirm
                            content={<>
                                <h3 className="popup-title">Voulez-vous annuler l'action en cours ?</h3>
                                <button className="bouton-popupConfirm-oui" onClick={togglePopupConfirm, togglePopup}>Oui</button>
                                <button className="bouton-popupConfirm-non" onClick={togglePopupConfirm}>Non</button>
                            </>}
                        />}
                        <img src={stop} alt='bouton emergency stop' className='bouton-stop' onClick={togglePopupEmergency}/>
                        {isOpenEmergency && <PopUpEmergency
                            content={<>
                                <h3 className="popup-title">Arrêt d'urgence effectué</h3>
                                <p> Toutes les actions ont été arrêtées. <br/> Pour revenir à la page d'accueil, cliquez sur OK. </p>
                                <button className="bouton-popupEmergency-ok" onClick={togglePopupEmergency, togglePopupEmerg}>OK</button>
                            </>}
                         />}
                    </div>
                    <div className="avancement-box">
                        <p className="etat-title"> {msg_act_courante} en cours ...</p>
                    </div>
                    
                </>}
            />}
            
                <div className='etat-courant'>
                    <div className='etat-import'>
                        <GiRobotGrab className="icone" />
                        Etat du robot :
                    {isOpen ? <span className='rep-occ'>OCCUPE </span> : <span className='rep'>LIBRE</span>}
                    </div>
                    <div className='etat-import'>
                        <AiFillSafetyCertificate className="icone" />
                        Sécurité :
                        <span className='rep'> OK </span>
                    </div>
                </div>
        </div>
    )
}

export default Configuration