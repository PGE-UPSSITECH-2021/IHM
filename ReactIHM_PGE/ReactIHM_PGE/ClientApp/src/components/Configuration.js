import '../styles/Configuration.css'
import React,{ useState } from 'react';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiRobotGrab } from "react-icons/gi";
import { useFilePicker } from 'use-file-picker'
import Popup from './PopUp'
import PopUpConfirm from './PopUpConfirm'
import pause from '../assets/pause.png'
import stop from '../assets/stop.png'

function Configuration() {

    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({ multiple: false, accept: ['.csv'] })

    //Gestion des POPUPS
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
        setIsOpenConfirm(false);
    }
    const togglePopupConfirm = () => {
        setIsOpenConfirm(!isOpenConfirm);
    }

    //Gestion séléction configuration
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedPlaque, setSelectedPlaque] = useState("");
    const [selectedDiam, setSelectedDiam] = useState("");
    const [rangevalConf, setRangevalConf] = useState(50); 

    function selectAll() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var allAlreadySelected = true;
        for (var checkbox of checkboxes) {
            if (checkbox.checked == false) {
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
            if (checkbox.checked == true) {
                if (str == "") {
                    str += checkbox.value;
                } else {
                    str += ", " + checkbox.value;
                }
            }
        }
        setSelectedDiam(str);
    }

    function configValid() {
        if (isOpen || selectedAction=="") {
            return false;
        }else if (selectedAction == "Localiser la plaque") {
            return selectedPlaque != "";
        } else {
            return selectedPlaque != "" && selectedDiam != "";
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

    function handleSelectDiam(event) {
        event.preventDefault();
        setSelectedDiam(event.target.value);
    }

    function disableGeneral() {
        return isOpen;
    }
    function disableDiam() {
        return selectedAction == "Localiser la plaque" || isOpen;
    }
    function disableConf() {
        return selectedAction == "Localiser la plaque" || selectedAction == "Déplacer le robot" ||isOpen;
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
                    <option value="Vérifier conformité">Vérifier conformité</option>
                    <option value="Déplacer le robot">Déplacer le robot</option>
                </select>
            </div>
            <div className='champ'><label className='labels'>Type de plaque :</label>
                <select value={selectedPlaque} onChange={handleSelectPlaque} disabled={disableGeneral()}>
                    <option selected disabled hidden value="">-----</option>
                    <option value="Tôle plate">Tôle plate</option>
                    <option value="Tôle cintrée">Tôle cintrée</option>
                    <option value="Tôle épaisse">Tôle épaisse</option>
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
            <button type="button" className="bouton-normal" disabled={!configValid()}>Sauvegarder</button>
            <button type="button" className="bouton-normal" disabled={disableGeneral()}>Configuration par défaut</button>
            <button type="submit" className="bouton-run" onClick={togglePopup} disabled={!configValid()}>Run</button>
            {isOpen && <Popup
                content={<>
                    <h3 className="popup-title">Lancement de l'action</h3>
                    <p className="popup-recap-title"> Récapitulatif de la configuration </p>
                    <p className="popup-element"> Action choisie : {selectedAction}</p>
                    <p className="popup-element"> Type de la plaque : {selectedPlaque} </p>
                    {(selectedAction == "Localiser la plaque") ? <span></span> : <p className="popup-element"> Diamètre(s) des trous : {selectedDiam} </p>}
                    {(selectedAction == "Localiser la plaque" || selectedAction == "Déplacer le robot" ) ? <span></span> : <p className="popup-element"> Taux de confiance minimum : {rangevalConf} %</p>}
                    <div className='img-pause-stop'>
                        <img src={pause} alt='bouton pause' className='bouton-pause' />
                        <img src={stop} alt='bouton emergency stop' className='bouton-stop' />
                    </div>
                    <button className="annuler" onClick={togglePopupConfirm}>Annuler</button>
                    {isOpenConfirm && <PopUpConfirm
                        content={<>
                            <h3 className="popup-title">Voulez-vous annuler l'action en cours ?</h3>
                            <button className="bouton-popupConfirm-oui" onClick={togglePopupConfirm, togglePopup}>Oui</button>
                            <button className="bouton-popupConfirm-non" onClick={togglePopupConfirm}>Non</button>
                        </>}
                    />}
                    <div className="avancement-box">
                        <p className="etat-title"> {selectedAction} en cours ...</p>
                    </div>
                    
                </>}
            />}
            
                <div className='etat-courant'>
                    <div className='etat-import'>
                        <GiRobotGrab className="icone" />
                        Etat du robot :
                        <span className='rep'> LIBRE </span>
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