/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN & Enzo CORRADI
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/ConnexionScreen.css'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppContextWrongID } from "../lib/contextLibWrongID";
import { useAppContextAuth } from "../lib/contextLibAuth";
import logo_usr from '../assets/logo_usr.png'
import { Text } from 'react-native'
import Popup from './PopUpMDP';
import FireAuth from './FireAuth';

var fireAuth = new FireAuth();
var type = "user";
var error = "";
var submitMode = false;
function ConnexionScreen({ failed, modeCo, setModeCo }) {

    //Gestion de la pop-up MDP oublié
    const [disableButton, setDisableButton] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
        submitMode = !submitMode;
        setEmail("");
        setEmailReset("");
        userHasFailed(false);
        userHasFailedReset(false);

    }

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const { userHasAuthenticated } = useAppContextAuth();
    const { userHasFailed } = useAppContextWrongID();
    const [failedReset, userHasFailedReset] = useState(false);
    const [email, setEmail] = useState("");
    const [emailReset, setEmailReset] = useState("");


    function resetPassword() {
        setDisableButton(true);
        userHasFailed(false);
        userHasFailedReset(false);
        fireAuth.resetPassword(emailReset).then((value) => {
            error = value;
            switch (value) {
                case "success":
                    togglePopup();
                    setEmailReset("");
                    userHasFailedReset(false);
                    alert("Un mail de réinitialisation du mot de passe vient de vous être envoyé à l'adresse email fournie.");
                    break;

                case "error":
                    alert("Une erreur est survenue dans l'envoi du mail de réinitialisation. Veuillez réessayer.");

                    break;

                case "auth/user-not-found":

                    userHasFailedReset(true);
                    break;

                default:
                    alert("Une erreur inconnue est survenue. Veuillez réessayer.");
                    break;
            }

            setDisableButton(false);
        });

    }

    function validateForm() {
        if (disableButton) {
            return false;
        }
        return userID.length > 0 && password.length > 0;
    }

    function validateMail() {
        return email.length > 0 && email.includes("@") && email.includes(".");
    }
    function validateMailReset() {
        if (disableButton) {
            return false;
        }
        return emailReset.length > 0 && emailReset.includes("@") && emailReset.includes(".");
    }

    function handleSubmit(event) {
        if (!submitMode) {
            setDisableButton(true);
            event.preventDefault();
            userHasAuthenticated(false);
            userHasFailed(false);
            userHasFailedReset(false);
            //Lancer chargement en désactivant le bouton
            fireAuth.signIn(userID, password).then((value) => {
                type = value;
                if (value === "Administrateur" || value === "Utilisateur" || value === "Maintenance") {
                    userHasAuthenticated(true);
                    setModeCo(type === "Utilisateur" ? 0 : type === "Administrateur" ? 1 : 2);
                    //Fin du chargement

                }
                else {
                    //Fin du chargement et affichage de l'erreur
                    userHasFailed(true);
                }
                setDisableButton(false);
            });
        }
        else {
            handleSubmitMail(event);
        }



    }

    function handleSubmitMail(event) {
        console.log("SUBMIIIT3");
        event.preventDefault();
        resetPassword();
    }


    return (
        <div>
            <img src={logo_usr} alt='logo utilisateur' className='logo-usr' />
            <h2 className='pge-id-title'>Identification</h2>
            <div className='pge-id-champ'>
                <Form onSubmit={handleSubmit} className="login" autocomplete="off">
                    <Form.Group size="lg" controlId="userID">
                        <Form.Label className="label">Nom d'utilisateur :</Form.Label>
                        <Form.Control
                            autoFocus
                            type="userID"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                            className={failed ? "input-box-fail" : "input-box"}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label className="label">Mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={failed ? "input-box-fail" : "input-box"}
                        />
                    </Form.Group>
                    <div className="lineCo">
                        <span className='forgotten-mdp'><Text style={{ color: 'blue' }} onPress={togglePopup}>Mot de passe oublié ?</Text></span>
                        {isOpen && <Popup
                            content={<>
                                <h3 className="popup-title">Mot de passe oublié</h3>
                                <Form onSubmit={handleSubmit} className="mail-form" autocomplete="off">
                                    <Form.Group size="lg" controlId="email">
                                        <Form.Label className="label-mail">Adresse e-mail :</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={emailReset}
                                            onChange={(e) => setEmailReset(e.target.value)}
                                            className={failedReset ? "input-box-fail" : "input-box"}
                                        />
                                    </Form.Group>
                                </Form>
                                {failedReset ?
                                    <div className='info-erreur'>{error === "auth/user-not-found" ? "Aucun utilisateur trouvé pour cette adresse mail."
                                        : "Un problème de connexion est survenu. Veuillez réessayer."}</div> : <div></div>}

                                <Button block size="lg" type="submit" disabled={!validateMailReset()} className="valider-button">
                                    Confirmer
                                </Button>
                            </>}
                            handleClose={togglePopup}
                        />}
                        <Button block size="lg" type="submit" disabled={!validateForm()} className="input-button">
                            Se connecter
                        </Button>
                    </div>
                    {failed ?
                        <div className='info-erreur'>{type === "auth/user-not-found" ? "Aucun utilisateur trouvé pour cette adresse mail."
                            : type === "auth/wrong-password" ? "Mot de passe erroné." : type === "auth/invalid-email" ? "L'email n'est pas valide." : "Un problème de connexion est survenu. Veuillez réessayer."}</div> : <div></div>}

                </Form>
            </div>

        </div>
    )
}

export default ConnexionScreen