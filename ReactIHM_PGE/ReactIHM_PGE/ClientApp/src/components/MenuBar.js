/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineHelpOutline } from "react-icons/md"
import { FiSettings } from "react-icons/fi"
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/MenuBar.css";
import { Button } from '@material-ui/core';
import { useAppContextAuth } from "../lib/contextLibAuth";



function Header({ pageRes, setPageRes, isDecoDisabled, currentPage, setCurrentPage, modeCo, showHistory, setShowHistory }) {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const { userHasAuthenticated } = useAppContextAuth();

    function handleLogout() {
        userHasAuthenticated(false);
    }

    // Fonctions qui permettent un changement de page correct selon l'item choisi dans la barre de menu
    function changePageToMain() {
        if (!isDecoDisabled) {
            if (currentPage === 1 && showHistory === false) {
                alert("TODO: PROPOSER SAUVEGARDE");
            }
            setCurrentPage(0);
        }
    }
    function changePageToResult() {
        if (!isDecoDisabled) {
            if (currentPage === 1 && showHistory === false) {
                alert("TODO: PROPOSER SAUVEGARDE");
            }
            setShowHistory(true);
            setPageRes(0);
            setCurrentPage(1);
        }
    }
    function changePageToUser() {
        if (!isDecoDisabled) {
            if (currentPage === 1 && showHistory === false) {
                alert("TODO: PROPOSER SAUVEGARDE");
            }
            setCurrentPage(2);
        }
    }
    function changePageToHelp() {
        if (!isDecoDisabled) {
            if (currentPage === 1 && showHistory === false) {
                alert("TODO: PROPOSER SAUVEGARDE");
            }
            setCurrentPage(3);
        }
    }
    function changePageToParam() {
        if (!isDecoDisabled) {
            if (currentPage === 1 && showHistory === false) {
                alert("TODO: PROPOSER SAUVEGARDE");
            }
            setCurrentPage(4);
        }
    }

    // Fonctions qui permettent de savoir quel élément du menu est actif
    function isMainActive() {
        return currentPage === 0;
    }
    function isResultsActive() {
        return currentPage === 1;
    }
    function isUserActive() {
        return currentPage === 2;
    }
    function isHelpActive() {
        return currentPage === 3;
    }
    function isParamActive() {
        return currentPage === 4;
    }

    // Fonction pour déterminer le style à appliquer au menu selon si il est actif ou non
    function getMenuItemClass() { 
        if (!isDecoDisabled) {
            return "menuItem";
        } else {
            return "menuItem-disabled";
        }
    }

    return (
        <div id="header">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>
                    <div className="logotext">
                        {/* small and big change using menucollapse state */}
                        <p >{menuCollapse ? "Logo" : "MENU"}</p>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={isMainActive()} icon={<FiHome />} onClick={changePageToMain} className={getMenuItemClass()}><span className='textItem'>Accueil</span></MenuItem>
                        {modeCo === 2 ? <span /> :
                            <MenuItem active={isResultsActive()} icon={<FaList />} onClick={changePageToResult} className={getMenuItemClass()}><span className='textItem'>Résultats</span></MenuItem>
                        }
                        {modeCo === 1 ?
                            <MenuItem active={isUserActive()} icon={<FaRegUser />} className={getMenuItemClass()} onClick={changePageToUser}><span className='textItem'>Admin</span></MenuItem>
                            : modeCo === 0 ? <MenuItem active={isUserActive()} icon={<FaRegUser />} className={getMenuItemClass()} onClick={changePageToUser}><span className='textItem'>Utilisateur</span></MenuItem>
                                : <MenuItem active={isUserActive()} icon={<FaRegUser />} className={getMenuItemClass()} onClick={changePageToUser}><span className='textItem'>Maintenance</span></MenuItem>
                        }
                        {modeCo === 1 ?
                            <MenuItem active={isParamActive()} icon={<FiSettings />} className={getMenuItemClass()} onClick={changePageToParam}><span className='textItem'>+/- Comptes</span></MenuItem>
                            : <span></span>}
                        <MenuItem active={isHelpActive()} icon={<MdOutlineHelpOutline />} className={getMenuItemClass()} onClick={changePageToHelp}><span className='textItem'>Aide</span></MenuItem>
                        {modeCo === 1 ?
                            <div className='space-admin'><Button type="solid" startIcon={<FaPowerOff />} className="boutonDeconnexion" onClick={handleLogout} disabled={isDecoDisabled}>Déconnexion</Button></div>
                            : modeCo === 0 ? <div className='space'><Button type="solid" startIcon={<FaPowerOff />} className="boutonDeconnexion" onClick={handleLogout} disabled={isDecoDisabled}>Déconnexion</Button></div>
                                : <div className='space-maintenance'><Button type="solid" startIcon={<FaPowerOff />} className="boutonDeconnexion" onClick={handleLogout} disabled={isDecoDisabled}>Déconnexion</Button></div>
                        }
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
}


export default Header;