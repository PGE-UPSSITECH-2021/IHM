﻿import '../styles/ParamADMScreen.css'
import '../styles/bootstrapStyle.scss'
import React, { useState } from "react";
import MenuBar from './MenuBar'
import ModifAccount from './ModifAccount'


function ParamADMScreen({ pageRes, setPageRes, currentPage, setCurrentPage, modeCo, showHistory, setShowHistory, memAction, setMemAction }) {

    return (
        <div className='main-modif-account-admin'>
            <span className='menu-bar'><MenuBar pageRes={pageRes} setPageRes={setPageRes} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} showHistory={showHistory} setShowHistory={setShowHistory} /></span>
            <span className="main-modif-account" > <ModifAccount modeCo={modeCo} /></span>
        </div>
    )
}

export default ParamADMScreen;