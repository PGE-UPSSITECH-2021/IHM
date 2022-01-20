import '../styles/MiddleHelpScreen.css'
import noCam from '../assets/NoCamera.png'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useRef } from 'react'
import { GrLinkNext, GrLinkPrevious, GrNext, GrPrevious } from 'react-icons/gr'
import { BsCheck2Circle } from 'react-icons/bs'
import { BiErrorCircle } from 'react-icons/bi'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../styles/bootstrapStyle.scss'
import PopUpHelp from './PopUpHelp'
import Popup from './PopUp'


function MiddleHelpScreen() {

    const inputRef = useRef();
    const [numTrou, setnumTrou] = useState("Title");
    const [desc, setdesc] = useState("Text");
    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupHelp = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div className='middleHelp'>

            <div className='cardHelp'>
                <Card style={{ width: '40rem' }} >
                    <Card.Body>
                        <Card.Title className="titleDiametre">Aide</Card.Title>

                        <button className="buttonHelp" onClick={function (event) {
                            setnumTrou("Comment modifier la configuration ?");
                            setdesc("La configuration peut être modifiée depuis l'onglet \"Acceuil\", d'où il est possible de choisir l'action à effectuer, le type de plaque, le ou les diamètre(s) des trous à identifier et le taux de confiance.");
                            togglePopupHelp();
                            
                        }}>
                            Comment modifier la configuration ?
                        </button>

                        <button className="buttonHelp" onClick={function (event) {
                            setnumTrou("Comment changer de mot de passe ?");
                            setdesc("Dans l'onglet \"Utilisateur -> Modification des paramètres\", il suffit d'entrer votre adresse mail, puis le nouveau mot de passe choisi.");
                            togglePopupHelp();
                        }}>
                            Comment changer de mot de passe ?
                        </button>


                    </Card.Body>
                </Card>
            </div>

            {isOpen && <PopUpHelp
                content={<>
                    <h3 className="popup-title">{numTrou}</h3>
                    <h5 className="popup-text">{desc}</h5>
                </>}
                handleClose={togglePopupHelp}
            />}


        </div>


    )
}

export default MiddleHelpScreen