/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React from "react";
import '../styles/PopUpResult.css'

const PopUpResult = props => {
    return (
        <div className="popup-box-conformity">
            <div className="box-conformity">
                {props.content}
            </div>
        </div>
    );
};

export default PopUpResult;