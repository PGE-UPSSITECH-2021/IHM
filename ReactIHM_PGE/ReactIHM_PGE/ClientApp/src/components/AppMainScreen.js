import '../styles/AppMainScreen.css';
import TopBanner from './TopBanner';
import StateBannerUSR from './StateBannerUSR';
import MainScreenUSR from './MainScreenUSR';
import React, { useState } from "react";
import ResultScreen from './ResultScreen';
import UserScreen from './UserScreen';
import HelpScreen from './HelpScreen';


function AppMainScreen({ modeCo }) { // main screen
    document.body.id = 'bodyMain';

    const [currentPage, setCurrentPage] = useState(0); //POUR MODE USR: MAIN:0, RESULTS:1, PARAM:2, UTILISATEUR:3, AIDE:4
    const [actionEnCours, setActionEnCours] = useState("Aucune action en cours");
    if (modeCo === 0) { // USER
        if (currentPage === 0) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} /></div>
                    <div className='main'><MainScreenUSR actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={0}/></div>
                </div>
            )
        } else if (currentPage === 1) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0} /></div>
                    <div className='main'><ResultScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} /></div>
                </div>
            )
        } else if (currentPage === 2) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0}/></div>
                    <div className='main'><UserScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={0}/></div>
                </div>
            )
        } else if (currentPage === 3) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={0}/></div>
                    <div className='main'><HelpScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} /></div>
                </div>
            )
        }
    } else if (modeCo === 1) { // ADMIN
        if (currentPage === 0) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} /></div>
                    <div className='main'><MainScreenUSR actionEnCrous={actionEnCours} setActionEnCours={setActionEnCours} currentPage={0} setCurrentPage={setCurrentPage} modeCo={1}/></div>
                </div>
            )
        } else if (currentPage === 1) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} /></div>
                    <div className='main'><ResultScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={1} setCurrentPage={setCurrentPage} /></div>
                </div>
            )
        } else if (currentPage === 2) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} /></div>
                    <div className='main'><UserScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={2} setCurrentPage={setCurrentPage} modeCo={1}/></div>
                </div>
            )
        } else if (currentPage === 3) {
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} /></div>
                    <div className='main'><HelpScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={3} setCurrentPage={setCurrentPage} /></div>
                </div>
            )
        } else if (currentPage === 4) { // TODO MODIF PARAM SPACE PAGE
            return (
                <div className='bodyMain'>
                    <div className='topBanner'><TopBanner /></div>
                    <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={1} /></div>
                    <div className='main'><HelpScreen actionEnCours={actionEnCours} setActionEnCours={setActionEnCours} currentPage={4} setCurrentPage={setCurrentPage} /></div>
                </div>
            )
        }

    } else if (modeCo === 2) { // MAINTENANCE TODO
        return (
            <div className='bodyMain'>
                <div className='topBanner'><TopBanner /></div>
                <div className='stateBanner'><StateBannerUSR actionEnCours={actionEnCours} modeCo={2} /></div>
            </div>
        )
    }
}
export default AppMainScreen;