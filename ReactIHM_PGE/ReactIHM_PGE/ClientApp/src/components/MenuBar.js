import React, { useState } from "react";
//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent
} from "react-pro-sidebar";
//import icons from react icons
import { FaList } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import { MdOutlineHelpOutline} from "react-icons/md"
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/MenuBar.css";
import { Button } from '@material-ui/core';
import { useAppContextAuth } from "../lib/contextLibAuth";



function Header({ isDecoDisabled, currentPage, setCurrentPage }) {

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

    function changePageToMain() {
        if (!isDecoDisabled) {
            setCurrentPage(0);
        }
    }
    function changePageToResult() {
        if (!isDecoDisabled) {
            setCurrentPage(1);
        }
    }

    function isMainActive() {
        return currentPage === 0;
    }
    function isResultsActive() {
        return currentPage === 1;
    }
    function isParamActive() {
        return currentPage === 2;
    }
    function isUserActive() {
        return currentPage === 3;
    }
    function isHelpActive() {
        return currentPage === 4;
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
                        <MenuItem active={isMainActive()} icon={<FiHome />} onClick={changePageToMain} className="menuItem"><span className='textItem'>Accueil</span></MenuItem>
                        <MenuItem active={isResultsActive()} icon={<FaList />} onClick={changePageToResult} className="menuItem"><span className='textItem'>Résultats</span></MenuItem>
                        <MenuItem active={isParamActive()} icon={<BiCog />} className="menuItem"><span className='textItem'>Paramètres</span></MenuItem>
                        <MenuItem active={isUserActive()} icon={<FaRegUser />} className="menuItem"><span className='textItem'>Utilisateur</span></MenuItem>
                        <MenuItem active={isHelpActive()} icon={<MdOutlineHelpOutline />} className="menuItem"><span className='textItem'>Aide</span></MenuItem>
                        <div className='space'><Button type="solid" startIcon={<FaPowerOff />} className="boutonDeconnexion" onClick={handleLogout} disabled={isDecoDisabled}>Déconnexion</Button></div>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
}


export default Header;