import React from "react";
import '../styles/PopUpMDP.css'

const Popup = props => {
    return (
        <div className="popup-box-mdp">
            <div className="box-mdp">
                {props.content}
                <button className="annuler-mdp" onClick={props.handleClose}>Annuler</button>
            </div>
        </div>
    );
};

export default Popup;