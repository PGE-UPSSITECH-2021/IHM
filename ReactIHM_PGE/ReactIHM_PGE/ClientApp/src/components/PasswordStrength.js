import React, { useState } from "react";
import '../styles/PasswordStrength.css'
import CheckListPwd from './CheckListPwd';
import Button from 'react-bootstrap/Button';


function PasswordStrength() {

    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [containsUL, setContainsUL] = useState(false)
    const [containsLL, setContainsLL] = useState(false)
    const [containsN, setContainsN] = useState(false)
    const [containsSC, setContainsSC] = useState(false)
    const [contains7C, setContains7C] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)

    const [checkListValid, setCheckListValid] = useState(false)

    const checkListData = [
        ["Une lettre minuscule (a-z)", containsLL],
        ["Une lettre majuscule (A-Z)", containsUL],
        ["Un chiffre (0-9)", containsN],
        ["Un caractère spécial (!@#$)", containsSC],
        ["Au moins 7 caractères", contains7C],
        ["Mot de passe match", passwordMatch]
    ]

    const validatePassword = () => {

        if (newPassword.toLowerCase() !== newPassword) setContainsUL(true)
        else setContainsUL(false)

        if (newPassword.toUpperCase() !== newPassword) setContainsLL(true)
        else setContainsLL(false)

        if (/\d/.test(newPassword)) setContainsN(true)
        else setContainsN(false)

        if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(newPassword)) setContainsSC(true)
        else setContainsSC(false)

        if (newPassword.length >= 7) setContains7C(true)
        else setContains7C(false)

        if (newPassword !== "" && newPassword === passwordConfirm) setPasswordMatch(true)
        else setPasswordMatch(false)

        if (containsUL && containsLL && containsN && containsSC && contains7C && passwordMatch) setCheckListValid(true)
        else setCheckListValid(false)
    }

    return (
        <div className="mdp-area">
            <span className='label-identifiant'> Nouveau mot de passe : </span>
            <input type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onKeyUp={validatePassword} />
            <span className='label-identifiant'> Confirmation mot de passe : </span>
            <input type="password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                onKeyUp={validatePassword} />

            <Button block size="lg" type="submit" disabled={!checkListValid} className='mdp-sauv-button'>
                Enregistrer
            </Button>
            <br></br>
            <div className="must-container">
                {checkListData.map(data => <CheckListPwd data={data} />)}
            </div>
        </div>

    );
}

export default PasswordStrength;