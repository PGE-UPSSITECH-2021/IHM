import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'
import React, { useState } from "react";


function MainScreenUSR({ pageRes, setPageRes, actionEnCours, setActionEnCours, currentPage, setCurrentPage, modeCo, testRunning, setTestRunning, selectedTest, setSelectedTest, showHistory, setShowHistory, memAction, setMemAction, ros }) {

    const [isDecoDisabled, setDecoDisabled] = useState(false);
    const [actionRunning, setActionRunning] = useState(false);

    return (
        <div className='main-usr'>
            <span className='menu-bar'><MenuBar pageRes={pageRes} setPageRes={setPageRes} isDecoDisabled={isDecoDisabled} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} showHistory={showHistory} setShowHistory={setShowHistory} /></span>
            <span className='middle-screen'><MiddleScreen currentPage={currentPage} setCurrentPage={setCurrentPage} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} setDecoDisabled={setDecoDisabled} modeCo={modeCo}
                testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} showHistory={showHistory} setShowHistory={setShowHistory} ros={ros} /></span>
            <span className='configuration'><Configuration isDecoDisabled={isDecoDisabled} setDecoDisabled={setDecoDisabled} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} actionRunning={actionRunning} setActionRunning={setActionRunning} modeCo={modeCo}
                selectedTest={selectedTest} setSelectedTest={setSelectedTest} testRunning={testRunning} setTestRunning={setTestRunning} memAction={memAction} setMemAction={setMemAction} ros={ros} /></span >
        </div>
    )
}

export default MainScreenUSR