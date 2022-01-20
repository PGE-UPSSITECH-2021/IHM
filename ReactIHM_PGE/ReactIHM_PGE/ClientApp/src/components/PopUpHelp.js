import React from "react";
import '../styles/PopUpHelp.css'
import Card from 'react-bootstrap/Card'
import noCam from '../assets/NoCamera.png'


const PopUpHelp = props => {
    return (
        <div className="popup-box-help">
            <div className="box-help">
                {props.content}
                <button className="annuler-result" onClick={props.handleClose}>Retour</button>

            </div>
        </div>
    );
};

export default PopUpHelp;