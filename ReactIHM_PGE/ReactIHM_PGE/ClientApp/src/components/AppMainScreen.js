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


function AppMainScreen({ modeCo, ros }) { // Ecran principal
    document.body.id = 'bodyMain';

    const [currentPage, setCurrentPage] = useState(0); //Stocke le numéro de la page à afficher : ex pour Utilisateur : MAIN:0, RESULTS:1,  UTILISATEUR:2, AIDE:3
    const [actionEnCours, setActionEnCours] = useState("Aucune action en cours"); 
    const [testRunning, setTestRunning] = useState(false);
    const [selectedTest, setSelectedTest] = useState(""); //Mémorise le test réalisé (mode maintenance)
    const [showHistory, setShowHistory] = useState(true); //Permet de savoir si on passe par l'historique ou si on est directement redirigé vers les résultats suite à la fin d'une action
    const [pageRes, setPageRes] = useState(0); //Mémorise la page de résultats à afficher (Historique ou Résultats)
    const [memAction, setMemAction] = useState("") //Mémorise l'action réalisée


    if (modeCo === 0) { // Mode utilisateur
        if (currentPage === 0) { // Page accueil
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest}/></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={0}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 1) { // Page résultats
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest}/></div>
                    <div className='main'><ResultScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) { // Page profil utilisateur
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest}/></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction}/></div>
                </div>
            )
        } else if (currentPage === 3) { // Page d'aide
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} selectedTest={selectedTest}/></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={0} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction}/></div>
                </div>
            )
        }
    } else if (modeCo === 1) { // Mode administrateur
        if (currentPage === 0) { // Page accueil
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest}/></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={1}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 1) { // Page résultats
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest}/></div>
                    <div className='main'><ResultScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) { // Page profil administrateur
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest}/></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={1} 
                        showHistory={showHistory} setShowHistory={setShowHistory} memAction={memAction} setMemAction={setMemAction}/></div>
                </div>
            )
        } else if (currentPage === 3) { // Page d'aide
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest}/></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        } else if (currentPage === 4) { // Page ajout/suppression comptes
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} selectedTest={selectedTest}/></div>
                    <div className='main'><ParamADMScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={4} setCurrentPage={setCurrentPage} modeCo={1} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} /></div>
                </div>
            )
        }

    } else if (modeCo === 2) { // Mode maintenance
        if (currentPage === 0) { // Page accueil
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest}/></div>
                    <div className='main'><MainScreenUSR pageRes={pageRes} setPageRes={setPageRes} actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={2}
                        testRunning={testRunning} setTestRunning={setTestRunning} selectedTest={selectedTest} setSelectedTest={setSelectedTest} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction} ros={ros} /></div>
                </div>
            )
        } else if (currentPage === 2) { // Page profil maintenance
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest}/></div>
                    <div className='main'><UserScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={2} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction}/></div>
                </div>
            )
        } else if (currentPage === 3) { // Page d'aide
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} selectedTest={selectedTest}/></div>
                    <div className='main'><HelpScreen pageRes={pageRes} setPageRes={setPageRes} actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} modeCo={2} showHistory={showHistory} setShowHistory={setShowHistory}
                        memAction={memAction} setMemAction={setMemAction}/></div>
                </div>
            )
        }
    }
}
export default AppMainScreen;