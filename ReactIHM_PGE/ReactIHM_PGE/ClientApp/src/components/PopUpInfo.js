/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React from "react";
import '../styles/PopUpInfo.css'
 
const PopUpInfo = props => {
  return (
    <div className="popup-box-info">
      <div className="box-info">
        {props.content}
      </div>
    </div>
  );
};
 
export default PopUpInfo;