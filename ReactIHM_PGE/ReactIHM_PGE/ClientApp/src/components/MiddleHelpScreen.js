/* Project : DBRIF
 * Authors : Kim GAUME
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/MiddleHelpScreen.css'
import Card from 'react-bootstrap/Card'
import React, { useState, useRef } from 'react'
import '../styles/bootstrapStyle.scss'
import PopUpHelp from './PopUpHelp'


function MiddleHelpScreen({modeCo}) {

    const [nameTitle, setNameTitle] = useState("Title");
    const [descText, setDescText] = useState("Text");
    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupHelp = () => {
        setIsOpen(!isOpen);
    }

    if (modeCo == 0) { // Mode utilisateur
        return (
            <div className='middleHelp'>

                <div className='cardHelp'>
                    <Card>
                        <Card.Body className="card-body">
                            <Card.Title className="title-help">Aide</Card.Title>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Modifier la configuration");
                                setDescText("La configuration peut être modifiée depuis l'onglet \"Accueil\", d'où il est possible de choisir l'action à effectuer, le type de plaque, le ou les diamètre(s) des trous à identifier et le taux de confiance.");
                                togglePopupHelp();

                            }}>
                                Modifier la configuration
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Importer une configuration depuis l'ordinateur");
                                setDescText("À partir de l'onglet \"Accueil\", cliquez sur le bouton \"Importer une configuration\" et sélectionnez la configuration que vous souhaitez utiliser sur votre appareil.");
                                togglePopupHelp();

                            }}>
                                Importer une configuration depuis l'ordinateur
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer de mot de passe");
                                setDescText("Dans l'onglet \"Utilisateur -> Modification des paramètres\", il suffit d'entrer votre nouveau mot de passe choisi et de le confirmer. Les consignes à respecter pour le choix du mot de passe vous seront indiquées.");
                                togglePopupHelp();
                            }}>
                                Changer de mot de passe
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer d'adresse e-mail");
                                setDescText("Dans l'onglet \"Utilisateur -> Modification des paramètres\", il suffit d'entrer votre nouvelle adresse mail et de cliquer sur le bouton \"Enregistrer\".");
                                togglePopupHelp();
                            }}>
                                Changer d'adresse e-mail
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Consulter l'historique des résultats");
                                setDescText("Dans l'onglet \"Résultats\", repérez le résultat que vous souhaitez consulter en fonction de la configuration utilisée, du type de plaque examiné, de la date et de l'action effectuée. Cliquez sur le bouton correspondant à cette configuration dans la colonne de droite (en forme de loupe) pour consulter en détail le résultat choisi.");
                                togglePopupHelp();
                            }}>
                                Consulter l'historique des résultats
                            </button>



                        </Card.Body>
                    </Card>
                </div>

                {isOpen && <PopUpHelp
                    content={<>
                        <h3 className="popup-title">{nameTitle}</h3>
                        <h5 className="popup-text">{descText}</h5>
                    </>}
                    handleClose={togglePopupHelp}
                />}
            </div>
        )
    } else if (modeCo == 1) { // Mode administrateur
        return (
            <div className='middleHelp'>

                <div className='cardHelp'>
                    <Card>
                        <Card.Body className="card-body">
                            <Card.Title className="title-help">Aide</Card.Title>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Modifier la configuration");
                                setDescText("La configuration peut être modifiée depuis l'onglet \"Accueil\", d'où il est possible de choisir l'action à effectuer, le type de plaque, le ou les diamètre(s) des trous à identifier et le taux de confiance.");
                                togglePopupHelp();

                            }}>
                                Modifier la configuration
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Enregistrer une nouvelle configuration par défaut");
                                setDescText("Une fois que la configuration est réglée selon vos besoins à partir de l'onglet \"Accueil\", il suffit de cliquer sur le bouton \"Sauvegarder comme Config Défaut\" pour en faire la nouvelle configuration par défaut.");
                                togglePopupHelp();

                            }}>
                                Enregistrer une nouvelle configuration par défaut
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Importer une configuration depuis l'ordinateur");
                                setDescText("À partir de l'onglet \"Accueil\", cliquez sur le bouton \"Importer une configuration\" et sélectionnez la configuration que vous souhaitez utiliser sur votre appareil.");
                                togglePopupHelp();

                            }}>
                                Importer une configuration depuis l'ordinateur
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer de mot de passe");
                                setDescText("Dans l'onglet \"Administration -> Modification des paramètres\", il suffit d'entrer votre nouveau mot de passe choisi et de le confirmer. Les consignes à respecter pour le choix du mot de passe vous seront indiquées sur la page.");
                                togglePopupHelp();
                            }}>
                                Changer de mot de passe
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer d'adresse e-mail");
                                setDescText("Dans l'onglet \"Administrateur -> Modification des paramètres\", il suffit d'entrer votre nouvelle adresse mail et de cliquer sur le bouton \"Enregistrer\".");
                                togglePopupHelp();
                            }}>
                                Changer d'adresse e-mail
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Ajouter ou supprimer un utilisateur");
                                setDescText("Dans l'onglet \"+/* Comptes -> Modification des paramètres\", pour ajouter un compte : remplir la section de gauche et cliquer sur \"Enregistrer\". Pour supprimer un compte : remplir la section de droite et cliquer sur \"Supprimer\".");
                                togglePopupHelp();
                            }}>
                                Ajouter ou supprimer un utilisateur
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Consulter l'historique des résultats");
                                setDescText("Dans l'onglet \"Résultats\", repérez le résultat que vous souhaitez consulter en fonction de la configuration utilisée, du type de plaque examiné, de la date et de l'action effectuée. Cliquez sur le bouton correspondant à cette configuration dans la colonne de droite (en forme de loupe) pour consulter en détail le résultat choisi.");
                                togglePopupHelp();
                            }}>
                                Consulter l'historique des résultats
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Supprimer l'historique des résultats");
                                setDescText("Dans l'onglet \"Résultats\", repérez les résultats que vous souhaitez supprimer en fonction de la configuration utilisée, du type de plaque examiné, de la date et de l'action effectuée. Cochez les cases correspondantes dans la colonne de gauche pour sélectionner les éléments à supprimer, puis cliquez sur le bouton de suppression en forme de poubelle. Validez la suppression en cliquant sur \"Ok\". Vous pouvez sélectionner la totalité des résultats de l'historique en cochant la case sur la toute première ligne du tableau.");
                                togglePopupHelp();
                            }}>
                                Supprimer l'historique des résultats
                            </button>

                        </Card.Body>
                    </Card>
                </div>

                {isOpen && <PopUpHelp
                    content={<>
                        <h3 className="popup-title">{nameTitle}</h3>
                        <h5 className="popup-text">{descText}</h5>
                    </>}
                    handleClose={togglePopupHelp}
                />}
            </div>
        )
    } else { // Mode maintenance
        return (
            <div className='middleHelp'>

                <div className='cardHelp'>
                    <Card>
                        <Card.Body className="card-body">
                            <Card.Title className="title-help">Aide</Card.Title>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Évaluer un pôle");
                                setDescText("À partir de l'onglet \"Accueil\", choisir le pôle à évaluer dans le menu déroulant sur la droite, puis cliquer sur le bouton play (la flèche verte). L'évaluation peut être mise sur pause grâce au bouton bleu, ou arrêtée grâce au bouton rouge.");
                                togglePopupHelp();

                            }}>
                                Évaluer un pôle
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer de mot de passe");
                                setDescText("Dans l'onglet \"Maintenance -> Modification des paramètres\", il suffit d'entrer votre nouveau mot de passe choisi et de le confirmer. Les consignes à respecter pour le choix du mot de passe vous seront indiquées.");
                                togglePopupHelp();
                            }}>
                                Changer de mot de passe
                            </button>

                            <button className="button-help" onClick={function (event) {
                                setNameTitle("Changer d'adresse e-mail");
                                setDescText("Dans l'onglet \"Maintenance -> Modification des paramètres\", il suffit d'entrer votre nouvelle adresse mail et de cliquer sur le bouton \"Enregistrer\".");
                                togglePopupHelp();
                            }}>
                                Changer d'adresse e-mail
                            </button>


                        </Card.Body>
                    </Card>
                </div>

                {isOpen && <PopUpHelp
                    content={<>
                        <h3 className="popup-title">{nameTitle}</h3>
                        <h5 className="popup-text">{descText}</h5>
                    </>}
                    handleClose={togglePopupHelp}
                />}
            </div>
        )
    }

}

export default MiddleHelpScreen