import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'
import React, { useState } from "react";
import Popup from './PopUp'
import PopUpConfirm from './PopUpConfirm'
import PopUpEmergency from './PopUpEmergency'
import PopUpLancement from './PopUpLancement'
import stop from '../assets/stop.png'


function MiddleScreenLaunch({ actionEnCours, setActionEnCours, currentPage, setCurrentPage }) {

    const [isDecoDisabled, setDecoDisabled] = useState(false);

    const [isOpenEmergency, setIsOpenEmergency] = useState(false);
    const togglePopupEmergency = () => {
        setIsOpenEmergency(!isOpenEmergency);
    }
    const [isOpenLancement, setIsOpenLancement] = useState(false);
    const togglePopupLancement = () => {
        setIsOpenLancement(!isOpenLancement);
    }


    return (
        <div className='middle'>
            <p> {actionEnCours} </p>
            <h3 className="popup-title">Configuration lancée !</h3>
            <img src={stop} alt='bouton emergency stop' className='bouton-stop' onClick={togglePopupEmergency} />
            {isOpenEmergency && <PopUpEmergency
                content={<>
                    <h3 className="popup-title">Arrêt d'urgence effectué</h3>
                    <p> Toutes les actions ont été arrêtées. <br /> Pour revenir à la page d'accueil, cliquez sur OK. </p>
                    <button className="bouton-popupEmergency-ok" onClick={togglePopupEmergency}>OK</button>
                </>}
            />}
        </div>
    )
}

export default MiddleScreenLaunch