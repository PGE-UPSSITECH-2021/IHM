/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

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