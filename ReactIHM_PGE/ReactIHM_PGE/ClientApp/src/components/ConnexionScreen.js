/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
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
var disableButton = false;
function ConnexionScreen({ failed, modeCo, setModeCo }) {

    //Gestion de la pop-up MDP oublié
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
        setEmail("");
    }

    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const { userHasAuthenticated } = useAppContextAuth();
    const { userHasFailed } = useAppContextWrongID();
    const [email, setEmail] = useState("");

    function validateForm() {
        if (disableButton) {
            return false;
        }
        return userID.length > 0 && password.length > 0;
    }

    function validateMail() {
        return email.length > 0 && email.includes("@") && email.includes(".");
    }

    function handleSubmit(event) {
        disableButton = true;
        event.preventDefault();
        userHasAuthenticated(false);
        userHasFailed(false);
        //Lancer chargement en désactivant le bouton
        fireAuth.signIn(userID, password).then((value) => {
            type = value;
            if (value == "Administrateur" || value == "Utilisateur" || value == "Maintenance") {
                userHasAuthenticated(true);
                setModeCo(type == "Utilisateur" ? 0 : type == "Administrateur" ? 1 : 2);
                //Fin du chargement
                disableButton = false;

            }
            else {
                //Fin du chargement et affichage de l'erreur
                disableButton = false;
                userHasFailed(true);
            }
        });

    }

    function handleSubmitMail(event) {
        event.preventDefault();
        userHasFailed(false);
        userHasAuthenticated(false);
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
                                <Form onSubmit={handleSubmitMail} className="mail-form" autocomplete="off">
                                    <Form.Group size="lg" controlId="email">
                                        <Form.Label className="label-mail">Adresse e-mail :</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="textZone"
                                        />
                                    </Form.Group>
                                </Form>
                                <Button block size="lg" type="submit" disabled={!validateMail()} className="valider-button" onClick={togglePopup}>
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
                        <div className='info-erreur'>{type == "auth/user-not-found" ? "Aucun utilisateur trouvé pour cette adresse mail."
                            : type == "auth/wrong-password" ? "Mot de passe erroné." : type == "auth/invalid-email" ? "L'email n'est pas valide." : "Un problème de connexion est survenu. Veuillez réessayer."}</div> : <div></div>}

                </Form>
            </div>

        </div>
    )
}

export default ConnexionScreen