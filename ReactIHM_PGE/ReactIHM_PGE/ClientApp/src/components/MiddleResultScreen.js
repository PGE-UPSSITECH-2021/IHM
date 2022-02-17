﻿import '../styles/MiddleResultScreen.css'
import noCam from '../assets/NoCamera.png'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useRef } from 'react'
import { GrLinkNext, GrLinkPrevious, GrNext, GrPrevious } from 'react-icons/gr'
import { BsCheck2Circle } from 'react-icons/bs'
import { BiErrorCircle } from 'react-icons/bi'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { BsArrowReturnLeft} from "react-icons/bs"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../styles/bootstrapStyle.scss'
import PopUpResult from './PopUpResult'
import Popup from './PopUp'
import returnArrow from "../assets/returnArrow.png"


function MiddleResultScreen({ setPageRes, nameFileRes, setNameFileRes }) {


    const inputRef = useRef();
    const [numTrou, setnumTrou] = useState("Title");
    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupResult = () => {
        setIsOpen(!isOpen);
    }

    function changePageToHist() {
        setPageRes(0);
    }


    return (


        <div className='middleResult'>
            <div className="enveloppe-box-card">
                <div className="box-return"><img src={returnArrow} alt="return button" className="return-icon" onClick={changePageToHist} /></div>
                <div className='cardResult'>
                    <Card style={{ width: '18rem' }} >
                        <Card.Body>
                            <Card.Title className="titleDiametre">Diamètre : 5mm</Card.Title>
                            <Card.Text>
                                <BsCheck2Circle
                                    className="iconValidate" />
                                <span className="validateSection">
                                    3/4 trous identifiés </span>
                                <div>
                                    <BiErrorCircle
                                        className="iconUnconform" />
                                    <span className="unconformSection">
                                        1 non conforme</span>
                                </div>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="test">

                <Card className="cardImage" ref={inputRef}>
                    <Card.Img id="img" src={noCam} />

                </Card>
                <Card className="cardDescript" id="card">
                    <Card.Header className="cardDescriptTitle">Descriptif des trous identifiés</Card.Header>
                    <Card.Body className="cardBody">

                        <Card.Text>
                            <div className="cardTrous">
                                <Card >
                                    <Card.Header className="headerTrou">
                                        <div>
                                            Trou 1</div>
                                        <div className="iconSearchDiv">
                                            <button className="buttonDetails" onClick={function (event) { setnumTrou("Trou 1"); togglePopupResult(); }} >
                                                <HiOutlineDocumentSearch className="iconSearch" /></button></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                                Coordonnées = x, y
                                            </div>
                                            <div>
                                                Taux de confiance = 70%
                                            </div>
                                            <div>
                                                Conformité = conforme
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="cardTrous">
                                <Card >

                                    <Card.Header className="headerTrou">
                                        <div>
                                            Trou 2</div>
                                        <div className="iconSearchDiv">
                                            <button className="buttonDetails" onClick={function (event) { setnumTrou("Trou 2"); togglePopupResult(); }} >
                                                <HiOutlineDocumentSearch className="iconSearch" /></button></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                                Coordonnées = x, y
                                            </div>
                                            <div>
                                                Taux de confiance = 70%
                                            </div>
                                            <div>
                                                Conformité = conforme
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="cardTrous">
                                <Card >
                                    <Card.Header className="headerTrou">
                                        <div>
                                            Trou 3</div>
                                        <div className="iconSearchDiv">
                                            <button className="buttonDetails" onClick={function (event) { setnumTrou("Trou 3"); togglePopupResult(); }} >
                                                <HiOutlineDocumentSearch className="iconSearch" /></button></div>

                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                                Coordonnées = x, y
                                            </div>
                                            <div>
                                                Taux de confiance = 70%
                                            </div>
                                            <div>
                                                Conformité = non conforme
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>

                        </Card.Text>

                        {/*<Button variant="primary">Go somewhere</Button>*/}
                    </Card.Body>
                </Card>

            </div>
            <div className='BackNextButtons'>


                <button className="buttonNextBack"> <GrPrevious
                    className="icone-res" />
                    Précédent
                </button>

                <label id="numPage"> 1/3 </label>
                <button className="buttonNextBack"> Suivant <GrNext
                    className="icone-res" /></button>
                <div>
                    <button className="button-save-results"> Sauvegarder les résultats </button>
                </div>
            </div>
            {isOpen && <PopUpResult
                content={<>
                    <h3 className="popup-title">{numTrou}</h3>
                </>}
                handleClose={togglePopupResult}
            />}


        </div>


    )
}

export default MiddleResultScreen