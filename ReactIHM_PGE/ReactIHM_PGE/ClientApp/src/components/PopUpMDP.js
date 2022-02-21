/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

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