﻿import '../styles/ModifAccount.css'
import '../styles/bootstrapStyle.scss'
import PasswordStrength from './PasswordStrength'
import React, { useState } from "react";
import CheckListPwd from './CheckListPwd';
import Button from 'react-bootstrap/Button';
import { BiShowAlt } from "react-icons/bi"
import { BiHide } from "react-icons/bi"


function ModifAccount() {

    const [email, setEmail] = useState("");
    const [emailSupp, setEmailSupp] = useState("");
    const [identifiant, setIdentifiant] = useState("");

    const [newPasswordAccount, setNewPasswordAccount] = useState("");
    const [passwordConfirmAccount, setPasswordConfirmAccount] = useState("");

    const [containsUL, setContainsUL] = useState(false);
    const [containsLL, setContainsLL] = useState(false);
    const [containsN, setContainsN] = useState(false);
    const [containsSC, setContainsSC] = useState(false);
    const [contains7C, setContains7C] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [checkListValid, setCheckListValid] = useState(false);

    const [showMust, setShowMust] = useState(false);

    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedAccountSupp, setSelectedAccountSupp] = useState("");

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

    function validatePassword() {

        if (newPasswordAccount.toLowerCase() !== newPasswordAccount) {
            setContainsUL(true);
        } else {
            setContainsUL(false);
        }
        if (newPasswordAccount.toUpperCase() !== newPasswordAccount) {
            setContainsLL(true);
        } else {
            setContainsLL(false);
        }
        if (/\d/.test(newPasswordAccount)) {
            setContainsN(true);
        } else {
            setContainsN(false);
        }
        if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(newPasswordAccount)) {
            setContainsSC(true);
        } else {
            setContainsSC(false);
        }
        if (newPasswordAccount.length >= 7) {
            setContains7C(true);
        } else {
            setContains7C(false);
        }
        if (newPasswordAccount !== "" && newPasswordAccount === passwordConfirmAccount) {
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


    function enableSave() {
        return checkListValid;
    }

    function passwordModif(event) {
        setShowMust(true);
        setNewPasswordAccount(event.target.value);

    }
    function confirmPasswordModif(event) {
        setPasswordConfirmAccount(event.target.value);
    }

    function validateDataAccount() {

        return selectedAccount && containsUL && containsLL && containsN && containsSC && contains7C && passwordMatch && email.length > 0 && email.includes("@") && email.includes(".") && identifiant.length > 3;
    }

    function validateDataAccountSupp() {
        return selectedAccountSupp && emailSupp.length > 0 && emailSupp.includes("@") && emailSupp.includes(".");
    }


    function saveNewAccount() {
        alert("Compte ajouté");
        setEmail("");
        setIdentifiant("");
        setShowMust(false);
        setNewPasswordAccount("");
        setPasswordConfirmAccount("");
        setContainsUL(false);
        setSelectedAccount("");
    }

    function saveAccountSupp() {
        alert("Compte supprimé");
        setEmailSupp("");
        setSelectedAccountSupp("");
    }

    function handleSelectAccount(event) {
        event.preventDefault();
        setSelectedAccount(event.target.value);
    }

    function handleSelectAccountSupp(event) {
        event.preventDefault();
        setSelectedAccountSupp(event.target.value);
    }

    return (
        <div className='middle-screen-modif-account'>
            <div className='middle-modif-account'>
                <div className='mdp-mail-area-add'>
                <h3 className='add-account-title'> Ajouter un compte </h3>
                
                    <span className='label-identifiant'> Adresse e-mail : </span>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className='label-identifiant'> Identifiant : </span>
                    <input type="identifiant"
                        value={identifiant}
                        onChange={(e) => setIdentifiant(e.target.value)}
                    />
                    <span className='label-identifiant'> Type du compte : </span>
                    <select value={selectedAccount} onChange={handleSelectAccount}>
                        <option selected disabled hidden value="">-----</option>
                        <option value="Utilisateur">Utilisateur</option>
                        <option value="Administrateur">Administrateur</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Qualite">Qualité</option>
                    </select>
                <div className="mdp-area">
                    <span className='label-identifiant'> Mot de passe : </span>
                    <div className="mdp-area-2">
                        <input
                            className='pwd-new-confirm'
                            type={passwordIsVisible ? 'text' : 'password'}
                            value={newPasswordAccount}
                            onChange={e => passwordModif(e)}
                            onKeyUp={validatePassword}
                        />
                        <button onClick={() => setPasswordIsVisible(!passwordIsVisible)}> {passwordIsVisible ? <BiShowAlt /> : <BiHide />} </button>
                    </div>
                    <span className='label-identifiant'> Confirmation mot de passe : </span>
                    <div className="mdp-area-2">
                        <input
                            className='pwd-new-confirm'
                            type={passwordConfirmIsVisible ? 'text' : 'password'}
                            value={passwordConfirmAccount}
                            onChange={e => confirmPasswordModif(e)}
                            onKeyUp={validatePassword}
                        />
                        <button onClick={() => setPasswordConfirmIsVisible(!passwordConfirmIsVisible)}> {passwordConfirmIsVisible ? <BiShowAlt /> : <BiHide />} </button>
                    </div>
                    <br></br>
                    {showMust ?
                        <div className="must-container">
                            {checkListData.map(data => <CheckListPwd data={data} />)}
                        </div> : <div className="must-container-invisible"> </div>
                    }
                </div>

                    <Button block size="lg" type="submit" disabled={!validateDataAccount()} className='sauvegarder-button-acc' onClick={saveNewAccount}>
                    Enregistrer
                </Button>
                </div>
                <div className='mdp-mail-area-supp'>
                    <div className='mdp-mail-area-supp-two'>
                    <h3 className='add-account-title'> Supprimer un compte </h3>

                    <span className='label-identifiant'> Adresse e-mail : </span>
                    <input type="email"
                        value={emailSupp}
                        onChange={(e) => setEmailSupp(e.target.value)}
                    />
                    <span className='label-identifiant'> Type du compte : </span>
                    <select value={selectedAccountSupp} onChange={handleSelectAccountSupp}>
                        <option selected disabled hidden value="">-----</option>
                        <option value="Utilisateur">Utilisateur</option>
                        <option value="Administrateur">Administrateur</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Qualite">Qualité</option>
                    </select>

                    <Button block size="lg" type="submit" disabled={!validateDataAccountSupp()} className='supprimer-button' onClick={saveAccountSupp}>
                        Supprimer
                        </Button>
                        </div>
                </div>
        </div>
        </div >
    )
}

export default ModifAccount;