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
import { FaKey } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/MenuBarParamUser.css";



function MenuBarParamUser({ currentPageParam, setCurrentPageParam }) {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    function changePageToParam() {
        setCurrentPageParam(0);
    }

    function changePageToModif() {
        setCurrentPageParam(1);
    }

    function isParamActive() {
        return currentPageParam === 0;
    }
    function isModifActive() {
        return currentPageParam === 1;
    }

    return (
        <div id="menu-bar-settings">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>
                    <div className="logotext">
                        {/* small and big change using menucollapse state */}
                        <p >{menuCollapse ? "Logo" : "PARAMETRES"}</p>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={isParamActive()} icon={<FiHome />} onClick={changePageToParam} className="menuItemSettings"><span className='textItem'>Compte</span></MenuItem>
                        <MenuItem active={isModifActive()} icon={<FaKey />} onClick={changePageToModif} className="menuItemSettings"><span className='textItem'>Modifications</span></MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
}


export default MenuBarParamUser;