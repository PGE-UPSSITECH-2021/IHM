import React from "react";
import '../styles/PopUpResult.css'
import Card from 'react-bootstrap/Card'
import noCam from '../assets/NoCamera.png'


const PopUpResult = props => {
    return (
        <div className="popup-box-result">
            <div className="box-result">
                {props.content}
                <Card className="cardImagePopUp">
                    <Card.Img id="imgPopUpResult" src={noCam} />
                </Card>
                <button className="forcer-conform" onClick={props.handleClose}>Forcer conformité</button>
                <button className="annuler-result" onClick={props.handleClose}>Annuler</button>

            </div>
        </div>
    );
};

export default PopUpResult;