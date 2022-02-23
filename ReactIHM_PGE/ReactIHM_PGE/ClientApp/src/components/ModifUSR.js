import '../styles/ModifUSR.css'
import '../styles/bootstrapStyle.scss'
import PasswordStrength from './PasswordStrength'
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import FireAuth from './FireAuth';
import Form from 'react-bootstrap/Form';
import Popup from "./PopUp";


var fireAuth = new FireAuth();
var error = "";
function ModifUSR() {

    //Popups
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [failed, userHasFailed ] = useState(false);

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
        saveNewMail();
        setDisableButton(false);
    }


    //

    const [email, setEmail] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    function validateMailParam() {
        if (disableButton) {
            return false;
        }
        return email.length > 0 && email.includes("@") && email.includes(".");
    }

    function saveNewMail() {
        setDisableButton(true);

        fireAuth.changeEmail(email, currentEmail, currentPassword).then((value) => {
            error = value;

           
            switch (value) {

                case "success":
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    setEmail("");
                    alert("La modification de l'adresse email a bien été prise en compte.");
                    break;

                case "auth/network-request-failed":
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    alert("Un problème de connexion est survenu. Veuillez réessayer.");
                    break;

                case "auth/invalid-email":
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    alert("L'adresse email fournie est invalide");
                    break;

                case "auth/email-already-exists":
                    setCurrentEmail("");
                    setCurrentPassword("");
                    togglePopup();
                    alert("La nouvelle adresse email est déjà utilisée.");
                    break;

                default:
                    userHasFailed(true);
                    break;
             
            }
            setDisableButton(false);

        });
        //alert("Adresse email modifiée à " + email);
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
                    <Button block size="lg" type="submit" disabled={!validateMailParam()} className='sauvegarder-button' onClick={togglePopup}>
                        Enregistrer
                    </Button>
                    <PasswordStrength />

                </div>
            </div>
            {isOpen && <Popup
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

        </div>
    )
}

export default ModifUSR