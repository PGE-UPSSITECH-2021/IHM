import '../styles/AppMainScreen.css';
import TopBanner from './TopBanner';
import StateBannerUSR from './StateBannerUSR';
import MainScreenUSR from './MainScreenUSR';
import React, { useState } from "react";
import ResultScreen from './ResultScreen';
// import { AppContextPage } from "../lib/contextLibPage";


function AppMainScreen() { // main screen Usr mode
    document.body.id = 'bodyMain';

    const [currentPage, setCurrentPage] = useState(0); // MAIN:0, RESULTS:1, PARAM:2, UTILISATEUR:3, AIDE:4
    const [actionEnCours, setActionEnCours] = useState("Aucune action en cours");

    if (currentPage === 0) {
        return (
            // <AppContextPage.Provider value={{ currentPage, setCurrentPage }}>
            <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} /></div>
                <div className='main'><MainScreenUSR actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>
            </div>
            // </AppContextPage.Provider >
            )
    } else if (currentPage === 1) {
        return (
            // <AppContextPage.Provider value={{ currentPage, setCurrentPage }}>
            <div className='bodyMain'>
                <div className='topBanner'><TopBanner /></div>
                <div className='stateBanner'><StateBannerUSR  actionEnCours={actionEnCours} /></div>
                <div className='main'><ResultScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={currentPage} setCurrentPage={setCurrentPage}/></div>
            </div>
            // </AppContextPage.Provider >
        )
    }
}
export default AppMainScreen;