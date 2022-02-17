import React from "react";
import '../styles/PopUpEmergency.css'

const PopUpEmergency = props => {
    return (
        <div className="popup-box-emergency">
            <div className="box-emergency">
                {props.content}
            </div>
        </div>
    );
};

export default PopUpEmergency;