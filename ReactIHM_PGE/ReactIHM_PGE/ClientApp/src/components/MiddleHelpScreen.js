import '../styles/MiddleHelpScreen.css'
import Card from 'react-bootstrap/Card'
import React, { useState, useRef } from 'react'
import '../styles/bootstrapStyle.scss'
import PopUpHelp from './PopUpHelp'


function MiddleHelpScreen() {

    const inputRef = useRef();
    const [nameTitle, setNameTitle] = useState("Title");
    const [descText, setDescText] = useState("Text");
    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupHelp = () => {
        setIsOpen(!isOpen) ;
    }



    return (
        <div className='middleHelp'>

            <div className='cardHelp'>
                <Card style={{ width: '40rem' }} >
                    <Card.Body className="card-body">
                        <Card.Title className="title-help">Aide</Card.Title>

                        <button className="button-help" onClick={function (event) {
                            setNameTitle("Comment modifier la configuration ?");
                            setDescText("La configuration peut être modifiée depuis l'onglet \"Accueil\", d'où il est possible de choisir l'action à effectuer, le type de plaque, le ou les diamètre(s) des trous à identifier et le taux de confiance.");
                            togglePopupHelp();

                        }}>
                            Comment modifier la configuration ?
                        </button>

                        <button className="button-help" onClick={function (event) {
                            setNameTitle("Comment changer de mot de passe ?");
                            setDescText("Dans l'onglet \"Utilisateur -> Modification des paramètres\", il suffit d'entrer votre nouveau mot de passe choisi et de le confirmer. Les consignes à respecter pour le choix du mot de passe vous seront indiquées");
                            togglePopupHelp();
                        }}>
                            Comment changer de mot de passe ?
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

export default MiddleHelpScreen