import React from "react";
import '../styles/PopUpLancement.css'

const PopUpLancement = props => {
    return (
        <div className="popup-box-lancement">
            <div className="box-lancement">
                {props.content}
            </div>
        </div>
    );
};

export default PopUpLancement;