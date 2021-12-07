import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'
import React, { useState } from "react";


function MainScreenUSR({actionEnCours, setActionEnCours, currentPage, setCurrentPage}) {
        
    const [isDecoDisabled, setDecoDisabled] = useState(false);

    return (
        <div className='main-usr'>
            <span className='menu-bar'><MenuBar isDecoDisabled={isDecoDisabled} currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
            <span className='middle-screen'><MiddleScreen /></span>
            <span className='configuration'><Configuration isDecoDisabled={isDecoDisabled} setDecoDisabled={setDecoDisabled} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} /></span >
        </div>
    )
}

export default MainScreenUSR