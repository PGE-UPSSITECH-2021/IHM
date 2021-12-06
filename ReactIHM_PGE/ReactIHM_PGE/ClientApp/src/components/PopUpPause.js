import React from "react";
import '../styles/PopUpPause.css'

const PopUpPause = props => {
    return (
        <div className="popup-box-pause">
            <div className="box-pause">
                {props.content}
            </div>
        </div>
    );
};

export default PopUpPause;