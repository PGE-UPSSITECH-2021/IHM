/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

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