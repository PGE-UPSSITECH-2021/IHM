import '../styles/ParamUSR.css'
import '../styles/bootstrapStyle.scss'
import MenuBarParamUser from './MenuBarParamUser'
import React, { useState } from "react";
import logo_usr_param from '../assets/logo_usr.png';


function ParamUSR({modeCo}) {

    return (
        <div className='middle-usr-screen-param'>
            <div className='middle-usr-param'>
                <img src={logo_usr_param} alt='logo utilisateur' className='logo-usr-param' />
                {modeCo === 1 ? <h3 className='usr-param-title'> Compte Administrateur </h3> : <h3 className='usr-param-title'> Compte Utilisateur </h3>}
                <div className='compte-data-usr'>
                    <div className='compte-usr'>
                        <label className="label-compte-usr"> Nom d'utilisateur :</label>

                        <label className="label-compte-usr"> Type du compte : </label>

                        <label className="label-compte-usr"> Adresse e-mail : </label>
                    </div>
                    <div className='data-usr'>
                        {modeCo === 1 ? <span className="data-compte-usr"> admin </span> : <span className="data-compte-usr"> user </span>}
                       

                        {modeCo === 1 ? <span className="data-compte-usr"> Admin </span> : <span className="data-compte-usr"> Standard </span>}
                        

                        {modeCo === 1 ? <span className="data-compte-usr"> admin@excent.fr </span> : <span className="data-compte-usr"> user@excent.fr </span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParamUSR