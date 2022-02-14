/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */


import '../styles/AppMainScreen.css';
import TopBanner from './TopBanner';
import StateBannerUSR from './StateBannerUSR';
import MainScreenUSR from './MainScreenUSR';
import React, { useState } from "react";
import ResultScreen from './ResultScreen';
import UserScreen from './UserScreen';
import HelpScreen from './HelpScreen';
import ParamADMScreen from './ParamADMScreen';
import * as ROSLIB from 'roslib';


var ros = new ROSLIB.Ros({
    url: 'ws://192.168.1.63:9090' // AIP
    /*url: 'ws://192.168.137.80:9090' // Alexandre PC*/
})

function AppMainScreen({ modeCo }) { // main screen
    document.body.id = 'bodyMain';

    //MAIN CONNEXION RESEAU AIP ICI
    const [isConnectedROS, setIsConnectedROS] = useState(false);
    if (isConnectedROS === false) {
        // Fonction appel�e une fois la connexion �tablie
        ros.on('connection', function () {
            console.log('Connected to websocket server.');
            setIsConnectedROS(true);
        });
        // Fonction appel�e en cas d'erreur de connexion
        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });
        // Fonction appel�e une fois la connexion ferm�
        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
            setIsConnectedROS(false);
        });
    }

    const [currentPage, setCurrentPage] = useState(0); //POUR MODE USR: MAIN:0, RESULTS:1, PARAM:2, UTILISATEUR:3, AIDE:4
    const [actionEnCours, setActionEnCours] = useState("Aucune action en cours");
    const [testRunning, setTestRunning] = useState(false);
    const [selectedTest, setSelectedTest] = useState("");
    const [showHistory, setShowHistory] = useState(true);
    const [pageRes, setPageRes] = useState(0);
    const [memAction, setMemAction] = useState("")


    if (modeCo === 0) { // USER
        if (currentPage === 0) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest} /></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={0}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 1) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest} /></div>
                    <div className='main'><ResultScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest} /></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        } else if (currentPage === 3) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest} /></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        }
    } else if (modeCo === 1) { // ADMIN
        if (currentPage === 0) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest} /></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={1}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 1) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest} /></div>
                    <div className='main'><ResultScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest} /></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={1}
                        showHistory={showHistory} setShowHistory={setShowHistory} memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        } else if (currentPage === 3) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest} /></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        } else if (currentPage === 4) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest} /></div>
                    <div className='main'><ParamADMScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={4} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        }

    } else if (modeCo === 2) {
        if (currentPage === 0) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest} /></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={2}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest} /></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={2} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        } else if (currentPage === 3) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest} /></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={2} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        }
    }
}
export default AppMainScreen;