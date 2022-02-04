import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'
import React, { useState } from "react";


function MainScreenUSR({ nameFileCsv, setNameFileCsv, actionEnCours, setActionEnCours, currentPage, setCurrentPage, modeCo, testRunning, setTestRunning, selectedTest, setSelectedTest }) {
        
    const [isDecoDisabled, setDecoDisabled] = useState(false);
    const [actionRunning, setActionRunning] = useState(false);

    return (
        <div className='main-usr'>
            <span className='menu-bar'><MenuBar isDecoDisabled={isDecoDisabled} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            <span className='middle-screen'><MiddleScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} setDecoDisabled={setDecoDisabled} modeCo={modeCo}
                testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest}/></span>
            <span className='configuration'><Configuration nameFileCsv={nameFileCsv} setNameFileCsv={setNameFileCsv} isDecoDisabled={isDecoDisabled} setDecoDisabled={setDecoDisabled} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} modeCo={modeCo}
                selectedTest={selectedTest} setSelectedTest={setSelectedTest} testRunning={testRunning} setTestRunning={setTestRunning}/></span >
        </div>
    )
}

export default MainScreenUSR