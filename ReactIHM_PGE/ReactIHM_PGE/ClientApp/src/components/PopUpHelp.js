/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React from "react";
import '../styles/PopUpHelp.css'

const PopUpHelp = props => {
    return (
        <div className="popup-box-help">
            <div className="box-help">
                {props.content}
                <button className="return-help" onClick={props.handleClose}>Retour</button>

            </div>
        </div>
    );
};

export default PopUpHelp;