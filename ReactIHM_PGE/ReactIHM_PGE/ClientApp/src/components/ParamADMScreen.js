import '../styles/ParamADMScreen.css'
import '../styles/bootstrapStyle.scss'
import React, { useState } from "react";
import MenuBar from './MenuBar'
import ModifAccount from './ModifAccount'


function ParamADMScreen({ currentPage, setCurrentPage, modeCo }) {

    return (
        <div className='main-modif-account-admin'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            <span className="main-modif-account" > <ModifAccount modeCo={modeCo} /></span>
        </div>
    )
}

export default ParamADMScreen;