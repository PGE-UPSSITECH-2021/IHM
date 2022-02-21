/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/MiddleUserScreen.css'
import React, { useState } from 'react'
import ParamUSR from './ParamUSR'
import ModifUSR from './ModifUSR'
import MenuBarParamUser from './MenuBarParamUser'

function MiddleUserScreen({modeCo}) {


    const [currentPageParam, setCurrentPageParam] = useState(0); // Page résultats active : 0 : Accueil | 1 : Modifications compte

    return (
        <div className="whole-middle-user">
            <span className='param-menu-bar'><MenuBarParamUser currentPageParam={currentPageParam} setCurrentPageParam={setCurrentPageParam} /></span>
            {currentPageParam === 0 ? <div className='param-middle'><ParamUSR modeCo={modeCo} /></div> : <div className='param-middle'><ModifUSR /></div>}
        </div>
    )

}
export default MiddleUserScreen