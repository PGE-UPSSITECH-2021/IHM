import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'
import React, { useState } from "react";


function MainScreenUSR({actionEnCours, setActionEnCours, currentPage, setCurrentPage, modeCo}) {
        
    const [isDecoDisabled, setDecoDisabled] = useState(false);
    const [actionRunning, setActionRunning] = useState(false);
    const [selectedTest, setSelectedTest] = useState("");
    const [testRunning, setTestRunning] = useState(false);

    return (
        <div className='main-usr'>
            <span className='menu-bar'><MenuBar isDecoDisabled={isDecoDisabled} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            <span className='middle-screen'><MiddleScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} setDecoDisabled={setDecoDisabled} modeCo={modeCo}
                testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest}/></span>
            <span className='configuration'><Configuration isDecoDisabled={isDecoDisabled} setDecoDisabled={setDecoDisabled} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} modeCo={modeCo}
                selectedTest={selectedTest} setSelectedTest={setSelectedTest} testRunning={testRunning} setTestRunning={setTestRunning}/></span >
        </div>
    )
}

export default MainScreenUSR