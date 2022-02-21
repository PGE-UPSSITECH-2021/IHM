/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */


import React, { useState } from "react";
import '../styles/PasswordStrength.css'
import CheckListPwd from './CheckListPwd';
import Button from 'react-bootstrap/Button';
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

function PasswordStrength() { // Composant permettant de vérifier la validité d'un mot de passe selon différents criètres

    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [containsUL, setContainsUL] = useState(false);
    const [containsLL, setContainsLL] = useState(false);
    const [containsN, setContainsN] = useState(false);
    const [containsSC, setContainsSC] = useState(false);
    const [contains7C, setContains7C] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [checkListValid, setCheckListValid] = useState(false);

    const [showMust, setShowMust] = useState(false);

    const checkListData = [
        ["Une lettre minuscule (a-z)", containsLL],
        ["Une lettre majuscule (A-Z)", containsUL],
        ["Un chiffre (0-9)", containsN],
        ["Un caractère spécial (!@#$)", containsSC],
        ["Au moins 7 caractères", contains7C],
        ["Mot de passe match", passwordMatch]
    ]

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] = useState(false);

    const validatePassword = () => {

        if (newPassword.toLowerCase() !== newPassword) {
            setContainsUL(true);
        } else {
            setContainsUL(false);
        }
        if (newPassword.toUpperCase() !== newPassword) {
            setContainsLL(true);
        } else {
            setContainsLL(false);
        }
        if (/\d/.test(newPassword)) {
            setContainsN(true);
        } else {
            setContainsN(false);
        }
        if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(newPassword)) {
            setContainsSC(true);
        } else {
            setContainsSC(false);
        }
        if (newPassword.length >= 7) {
            setContains7C(true);
        } else {
            setContains7C(false);
        }
        if (newPassword !== "" && newPassword === passwordConfirm) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
        if (containsUL && containsLL && containsN && containsSC && contains7C && passwordMatch) {
            setCheckListValid(true);
        } else {
            setCheckListValid(false);
        }
    }

    function passwordModif(event) {
        setShowMust(true);
        setNewPassword(event.target.value);

    }
    function confirmPasswordModif(event) {
        setPasswordConfirm(event.target.value);
    }

    function saveNewPassword() {
        setShowMust(false);
        setNewPassword("");
        setPasswordConfirm("");
        setContainsUL(false);
    }

    return (
        <div className="mdp-area">
            <span className='label-identifiant'> Nouveau mot de passe : </span>
            <div className="mdp-area-2">
                <input
                    className='pwd-new-confirm'
                    type={passwordIsVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => passwordModif(e)}
                    onKeyUp={validatePassword}
                    />
                <button className="icon-set-mdp-visible" onClick={() => setPasswordIsVisible(!passwordIsVisible)}> {passwordIsVisible ? <BiShowAlt className="icon-eye" /> : <BiHide className="icon-eye"/>} </button>
            </div>
            <span className='label-identifiant'> Confirmation mot de passe : </span>
            <div className="mdp-area-2">
                <input
                    className='pwd-new-confirm'
                    type={passwordConfirmIsVisible ? 'text' : 'password'}
                    value={passwordConfirm}
                    onChange={e => confirmPasswordModif(e)}
                    onKeyUp={validatePassword}
                />
                <button className="icon-set-mdp-visible" onClick={() => setPasswordConfirmIsVisible(!passwordConfirmIsVisible)}> {passwordConfirmIsVisible ? <BiShowAlt className="icon-eye" /> : <BiHide className="icon-eye" />} </button>
            </div>
            <Button block size="lg" type="submit" disabled={!(containsUL && containsLL && containsN && containsSC && contains7C && passwordMatch)} className='mdp-sauv-button' onClick={saveNewPassword}>
                Enregistrer
            </Button>
            <br></br>
            {showMust ?
                <div className="must-container">
                    {checkListData.map(data => <CheckListPwd data={data} />)}
                </div> : <div className="must-container-invisible"> </div>
            }
        </div>

    );
}

export default PasswordStrength;