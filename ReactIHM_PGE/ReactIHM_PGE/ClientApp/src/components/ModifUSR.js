/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/ModifUSR.css'
import '../styles/bootstrapStyle.scss'
import PasswordStrength from './PasswordStrength'
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';


function ModifUSR() {

    const [email, setEmail] = useState("");
    function validateMailParam() {
        return email.length > 0 && email.includes("@") && email.includes(".");
    }

    function saveNewMail() {
        setEmail("");
    }

    return (
        <div className='middle-usr-screen-modif'>
            <div className='middle-usr-modif'>

                <h3 className='usr-modif-title'> Modifications des paramètres </h3>
                <div className='mdp-mail-area'>
                    <span className='label-identifiant'> Adresse e-mail : </span>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button block size="lg" type="submit" disabled={!validateMailParam()} className='sauvegarder-button' onClick={saveNewMail}>
                        Enregistrer
                    </Button>

                    <PasswordStrength />
                </div>
            </div>
        </div>
    )
}

export default ModifUSR