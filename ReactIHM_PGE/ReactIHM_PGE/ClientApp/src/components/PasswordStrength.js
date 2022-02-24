import React, { useState } from "react";
import '../styles/PasswordStrength.css'
import CheckListPwd from './CheckListPwd';
import Button from 'react-bootstrap/Button';
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import FireAuth from "./FireAuth";
import PopUpConfirm from "./PopUpConfirm";
import Form from 'react-bootstrap/Form';



var fireAuth = new FireAuth();
var error = "";
function PasswordStrength() {

    //Popups
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setCurrentEmail("");
            setCurrentPassword("");
        }
        userHasFailed(false);

    }
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [failed, userHasFailed] = useState(false);

    function validateMail() {
        return currentEmail.length > 0 && currentEmail.includes("@") && currentEmail.includes(".");
    }

    function validateForm() {
        if (disableButton) {
            return false;
        }
        return currentEmail.length > 0 && currentPassword.length > 0 && validateMail();
    }

    function handleSubmit(event) {
        setDisableButton(true);
        userHasFailed(false);
        event.preventDefault();
        saveNewPassword();
        setDisableButton(false);
    }


    //


    const [disableButton, setDisableButton] = useState(false);
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


    function enableSave() {
        if (disableButton) {
            return false;
        }
        return checkListValid;
    }

    function passwordModif(event) {
        setShowMust(true);
        setNewPassword(event.target.value);

    }
    function confirmPasswordModif(event) {
        setPasswordConfirm(event.target.value);
    }

    function saveNewPassword() {
        setDisableButton(true);
        fireAuth.changePassword(newPassword, currentEmail, currentPassword).then((value) => {
            error = value;

            switch (value) {

                case "success":
                    setShowMust(false);
                    setNewPassword("");
                    setPasswordConfirm("");
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    setContainsUL(false);
                    alert("Mot de passe changé avec succès.");
                    break;

                case "auth/network-request-failed":
                    setShowMust(false);
                    setContainsUL(false);
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    alert("Une problème de connexion est survenu. Veuillez réessayer.");
                    break;

                case "auth/weak-password":
                    setShowMust(false);
                    setContainsUL(false);
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    alert("Le nouveau mot de passe est trop faible. Veuillez le changer puis réessayer.");
                    break;

                default:
                    userHasFailed(true);
                    break;
            }
            
            setDisableButton(false);

        });
        
        //alert("Mot de passe modifié !");
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
            <Button block size="lg" type="submit" disabled={!(containsUL && containsLL && containsN && containsSC && contains7C && passwordMatch)||disableButton} className='mdp-sauv-button' onClick={togglePopup}>
                Enregistrer
            </Button>
            {isOpen && <PopUpConfirm
                content={<>
                    <h3 className="popup-title">Identification</h3>
                    <p className="popup-recap-title"> Veuillez vérifier votre identité </p>
                    <div className='pge-id-champ'>
                        <Form onSubmit={handleSubmit} className="login" autocomplete="off">
                            <Form.Group size="lg" controlId="userID">
                                <Form.Label className="label">Nom d'utilisateur :</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="userID"
                                    value={currentEmail}
                                    onChange={(e) => setCurrentEmail(e.target.value)}
                                    className={failed ? "input-box-fail" : "input-box"}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label className="label">Mot de passe :</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={failed ? "input-box-fail" : "input-box"}
                                />
                            </Form.Group>
                            <div className="lineCo">

                                <Button block size="lg" type="submit" disabled={!validateForm()} className="input-button">
                                    Confirmer
                                </Button>
                                <Button block size="lg" className="input-button" onClick={togglePopup}>
                                    Annuler
                                </Button>
                            </div>
                            {failed ?
                                <div className='info-erreur'>{error === "auth/user-not-found" ? "Aucun utilisateur trouvé pour cette adresse mail."
                                    : error === "auth/wrong-password" ? "Mot de passe erroné." : error === "auth/invalid-email" ? "L'email n'est pas valide." : "Un problème d'identification est survenu. Veuillez réessayer."}</div> : <div></div>}

                        </Form>
                    </div>

                </>}


            />}
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