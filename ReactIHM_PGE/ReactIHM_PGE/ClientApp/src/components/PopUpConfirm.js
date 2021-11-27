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