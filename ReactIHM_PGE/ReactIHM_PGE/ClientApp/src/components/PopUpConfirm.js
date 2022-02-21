/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React from "react";
import '../styles/PopUpConfirm.css'
 
const PopUpConfirm = props => {
  return (
    <div className="popup-box-confirm">
      <div className="box-confirm">
        {props.content}
      </div>
    </div>
  );
};
 
export default PopUpConfirm;