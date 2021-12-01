import '../styles/bootstrapStyle.scss'
import '../styles/MiddleResultScreen.css'
import noCamRes from '../assets/NoCamera.png'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useRef} from 'react'
import { GrLinkNext, GrLinkPrevious, GrNext, GrPrevious } from 'react-icons/gr'
import { BsCheck2Circle } from 'react-icons/bs'
import { BiErrorCircle } from 'react-icons/bi'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



function MiddleResultScreen() {
    //document.getElementById('card').style.height = document.getElementById('img').style.height;

    const inputRef = useRef()

    
    return (
        <div className='middleResult'>
          
            <div className='cardResult'>
                <Card style={{ width: '18rem' }} >
                    <Card.Body>
                        <Card.Title>Diamètre : 5mm</Card.Title>
                        <Card.Text>
                            <BsCheck2Circle
                                className="iconValidate" />
                            <span className = "validateSection">
                                3/4 trous identifiés </span>
                            <div>
                                <BiErrorCircle
                                    className="iconUnconform" />
                                <span className="unconformSection">
                                1 non conforme</span>
                            </div>

                        </Card.Text>
                        {/*<Button variant="primary">Go somewhere</Button>*/}
                    </Card.Body>
                </Card>
            </div>

            <div className="test">

                {/*<img src={noCam} alt='noCamera' className='img-noCamera-result' />*/}
                <Card className="cardImage" ref={inputRef}>
                    <Card.Img id="img" className="image_res" src={noCamRes} />
                </Card>
                <Card className="cardDescript" id="card">
                    <Card.Header className="cardDescriptTitle">Descriptif des trous identifiés</Card.Header>
                    <Card.Body className="cardBody">
                        {/*<div className="cardDescriptTitle">*/}
                            {/*<Card.Title>Descriptif des trous identifiés</Card.Title></div>*/}
                        <Card.Text>
                            <div className = "cardTrous">
                            <Card >
                                    <Card.Header className="headerTrou">
                                        <div>
                                        Trou 1</div>
                                        <div className="iconSearchDiv">
                                        <HiOutlineDocumentSearch className="iconSearch"/></div>
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
                                            <HiOutlineDocumentSearch className="iconSearch"/></div>

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
                                            <HiOutlineDocumentSearch className="iconSearch"/></div>

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
                    className="icone-result" />
                    Précédent
                </button>

                <label id="numPage"> 1/3 </label>
                <button className="buttonNextBack"> Suivant <GrNext
                    className="icone-result" /></button>

            </div>


            
            </div>
       
    )
}

export default MiddleResultScreen