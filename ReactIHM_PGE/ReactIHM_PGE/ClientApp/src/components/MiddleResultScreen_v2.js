/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/MiddleResultScreen_v2.css'
import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import '../styles/HistoryResults.css'
import loupe from '../assets/loupe.png'
import '../styles/bootstrapStyle.scss'
import returnArrow from "../assets/arrow_back.png"
import noCam from '../assets/NoCamera.png'
import JsonContent from '../files_results.json'
import PopUpResult from './PopUpResult'
import * as ROSLIB from 'roslib';


function MiddleResultScreen_v2({ setPageRes, nameFileRes, setNameFileRes, csvArray, setCsvArray, selectedAction, setResultAction, resultAction, setResultPlaque, resultPlaque, setResultDate, resultDate, showHistory, setShowHistory, memAction, setMemAction, ros }) {

    // Récupération du topic sur lequel on veut publier pour dire qu'on a reçu resultats
    var message_ihm_results_ok = new ROSLIB.Topic({
        ros: ros,
        name: '/result/ok',
        messageType: 'std_msgs/Bool'
    });

    // Récupération du topic sur lequel on veut publier pour dire qu'on force une conformité
    var message_ihm_forcer_conformite = new ROSLIB.Topic({
        ros: ros,
        name: '/forcer_conformite',
        messageType: 'deplacement_robot/Forcer_conforme'
    });

    // Identification
    const [trousIdentification, setTrousIdentification] = useState([]);
    const [nbTrousIdentification, setNbTrousIdentification] = useState(0);
    const [subscribedI, setSubscribedI] = useState(false);
    // ROS RECEPTION RESULTATS IDENTIFICATION
    function callbackResultatsIdentification(message) {
        setTrousIdentification(message.trous);
        setNbTrousIdentification(message.nbTrous);
        //Récupération du canvas sur la page
        var canvas_id = document.getElementById('img_ROS_id');
        if (canvas_id !== null) {
            var ctx_id = canvas_id.getContext('2d');
            //Création de l'image
            var img_id = new Image();
            //Fonction pour dessiner l'image sur le canvas dès son chargement
            img_id.onload = function () {
                console.log("IMG IDENTIFICATION ONLOAD");
                ctx_id.drawImage(img_id, 0, 0, 800, 500);
            };
            img_id.onerror = function () {
                console.log("IMG IDENTIFICATION ERROR");
            }
            // Récupération de l'image dans le message ROS (image) et conversion en image jpg
            img_id.src = `data:image/png;base64,${message.image.data}`;
        } else {
            console.log("CANVAS NULL");
        }
        var msg = new ROSLIB.Message({
            data: true
        });
        message_ihm_results_ok.publish(msg);
    }
    // Création du listener ROS Resultats Identification
    var resultats_identification_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/result/identification', // Choix du topic
        messageType: 'deplacement_robot/Identification' // Type du message transmis
    });
    if (subscribedI === false) {
        resultats_identification_listener.subscribe(callbackResultatsIdentification);
        setSubscribedI(true);
    }

    // Localiser la plaque
    const [pos_x, setPos_x] = useState(0);
    const [pos_y, setPos_y] = useState(0);
    const [pos_z, setPos_z] = useState(0);
    const [pos_a, setPos_a] = useState(0);
    const [pos_b, setPos_b] = useState(0);
    const [pos_g, setPos_g] = useState(0);
    const [subscribedL, setSubscribedL] = useState(false);
    // ROS RECEPTION RESULTATS LOCALISATION
    function callbackResultatsLocalisation(message) {
        setPos_x(message.x);
        setPos_y(message.y);
        setPos_z(message.z);
        setPos_a(message.a);
        setPos_b(message.b);
        setPos_g(message.g);
        //Récupération du canvas sur la page
        var canvas_loc = document.getElementById('img_ROS_loc');
        if (canvas_loc !== null) {
            var ctx_loc = canvas_loc.getContext('2d');
            //Création de l'image
            var img_loc = new Image();
            //Fonction pour dessiner l'image sur le canvas dès son chargement
            img_loc.onload = function () {
                console.log("IMG LOCALISATION ONLOAD");
                ctx_loc.drawImage(img_loc, 0, 0, 800, 500);
            };
            img_loc.onerror = function () {
                console.log("IMG LOCALISATION ERROR");
            }
            // Récupération de l'image dans le message ROS (image) et conversion en image jpg
            img_loc.src = `data:image/png;base64,${message.image.data}`;
        } else {
            console.log("CANVAS NULL");
        }
        var msg = new ROSLIB.Message({
            data: true
        });
        message_ihm_results_ok.publish(msg);
    }
    // Création du listener ROS Resultats Localisation
    var resultats_localisation_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/result/localisation', // Choix du topic
        messageType: 'deplacement_robot/Localisation' // Type du message transmis
    });
    if (subscribedL === false) {
        resultats_localisation_listener.subscribe(callbackResultatsLocalisation);
        setSubscribedL(true);
    }

    // Qualité
    var trous_quali = [];
    var nb_trous_quali = 0;
    const [trousQualite, setTrousQualite] = useState([]);
    const [nbTrousQualite, setNbTrousQualite] = useState(0);
    const [subscribedQ, setSubscribedQ] = useState(false);
    var lst_img_trous = [];
    const [allImgTrous, setAllImgTrous] = useState(lst_img_trous);
    // ROS RECEPTION RESULTATS QUALITE
    function callbackResultatsQualite(message) {
        trous_quali = message.trous; 
        nb_trous_quali = parseInt(message.nbTrous);
        initIsOpen(nb_trous_quali);
        setTrousQualite(message.trous); 
        setNbTrousQualite(message.nbTrous);
        //Récupération du canvas sur la page pour image globale qualité
        var canvas_q = document.getElementById('img_ROS_q');
        if (canvas_q !== null) {
            var ctx_q = canvas_q.getContext('2d');
            //Création de l'image
            var img_q = new Image();
            //Fonction pour dessiner l'image sur le canvas dès son chargement
            img_q.onload = function () {
                console.log("IMG GLOBALE QUALITE ONLOAD");
                ctx_q.drawImage(img_q, 0, 0, 800, 500);
            };
            img_q.onerror = function () {
                console.log("IMG GLOBALE QUALITE ERROR");
            }
            // Récupération de l'image dans le message ROS (image) et conversion en image jpg
            img_q.src = `data:image/png;base64,${message.image.data}`;
        } else {
            console.log("CANVAS NULL");
        }

        for (var ind = 0; ind < message.nbTrous; ind++) {
            var item = message.trous[ind];
            if (!lst_img_trous.includes(`data:image/png;base64,${item.image.data}`)) {
                lst_img_trous.push(`data:image/png;base64,${item.image.data}`);
            }
        }

        setAllImgTrous(lst_img_trous);

        var msg = new ROSLIB.Message({
            data: true
        });
        message_ihm_results_ok.publish(msg);
    }
    // Création du listener ROS Resultats Qualite
    var resultats_qualite_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/result/qualite', // Choix du topic
        messageType: 'deplacement_robot/Qualite' // Type du message transmis
    });
    if (subscribedQ === false) {
        resultats_qualite_listener.subscribe(callbackResultatsQualite);
        setSubscribedQ(true);
    }

    function changePageToHist() { // Fonction retour à l'historique
        if (showHistory === false) {
            alert("TODO: PROPOSER SAUVEGARDE");
        }
        setPageRes(0);
        setShowHistory(true);
    }

    function saveResult() {
        alert("Sauvegarde effectuée !"); //TODO
    }

    //PopUp details result
    const [isOpen, setIsOpen] = useState([]);
    const togglePopupResult = (i) => { 
        var tmp = [];
        for (var k = 0; k < isOpen.length; k++) {
            if (k === i) {
                tmp[k] = !isOpen[k];
            } else {
                tmp[k] = isOpen[k];
            }
        }
        setIsOpen(tmp);
    }

    function initIsOpen(taille) {
        var tmp = [];
        for (var k = 0; k < taille; k++) {
            tmp[k] = false;
        }
        setIsOpen(tmp);
    }

    if (showHistory === true) {

        JsonContent[nameFileRes].sort(function (a, b) {
            var a1st = -1; //negative value means left item should appear first
            var b1st = 1; //positive value means right item should appear first
            var equal = 0; //zero means objects are equal
            //compare your object's property values and determine their order
            if (JsonContent[nameFileRes].action === "identification" || JsonContent[nameFileRes].action === "qualite")
                if (b.diam < a.diam) {
                    return b1st;
                }
                else if (a.diam < b.diam) {
                    return a1st;
                }
                else {
                    return equal;
                }

        });

        JsonContent[nameFileRes].sort(function (a, b) {
            var a1st = -1; //negative value means left item should appear first
            var b1st = 1; //positive value means right item should appear first
            var equal = 0; //zero means objects are equal
            //compare your object's property values and determine their order
            if (JsonContent[nameFileRes].action === "qualite")
                if (b.conform < a.conform) {
                    return b1st;
                }
                else if (a.conform < b.conform) {
                    return a1st;
                }
                else {
                    return equal;
                }

        });
    }

    const [forcerConform, setForceConform] = useState(false);
    const [popUpTrouX, setPopUpTrouX] = useState("");
    const [popUpTrouY, setPopUpTrouY] = useState("");
    const [popUpTrouDiam, setPopUpTrouDiam] = useState("");

    function handleToggleConformity(x, y) { //Fonction forcer conformité
        var diam_conform = 0;
        const newList = trousQualite.map((item) => {

            if (item.x === x && item.y === y) {
                diam_conform = item.diam;
                const updatedItem = {
                    ...item,
                    conforme: true,
                    raison: '',
                };
                return updatedItem;
            }

            console.log("Display item");
            console.log(item);
            return item;
        });

        setTrousQualite(newList);
        console.log("Nouvelle list");
        console.log(newList);
        // Création du message à envoyer
        var msg = new ROSLIB.Message({
            x: x,
            y: y,
            diametre: diam_conform,
            conformite: true
        });
        message_ihm_forcer_conformite.publish(msg);

    }

    // Variables et fonction pour forcer la conformité sur résultats simulés
    const [listSimulated, setListSimulated] = useState(JsonContent[nameFileRes]);
    const [openDetailsX, setOpenDetailsX] = useState("");
    const [openDetailsY, setOpenDetailsY] = useState("");

    function handleToggleConformitySimulated(x, y) {
        const newList = listSimulated.map((item) => {

            if (item.x === x && item.y === y) {
                const updatedItem = {
                    ...item,
                    conform: "oui",
                    reason: "aucune",
                };
                return updatedItem;
            }

            console.log("Display item");
            console.log(item);
            return item;
        });

        setListSimulated(newList);
        console.log("Nouvelle list");
        console.log(newList);


    }

    if (showHistory === true) { // Résultats simulés

        return(
            <div className='middleResult-v2'>
                <div className="box-return"><IconButton onClick={changePageToHist}><img src={returnArrow} alt="return button" className="return-icon-results" /></IconButton></div>
                {resultAction === "identification" ?
                    <div>
                        <div className="display-results">
                            <img src={noCam} alt="resultats camera" className="no-cam-results" />
                            <div className="table-results">

                                <div className='header-results-diam'></div>
                                <TableContainer className='table-rows-results'>
                                    <Table stickyHeader>
                                        <TableHead className='table-header-results'>

                                            <TableRow>
                                                <TableCell className='table-cell-results' align="center">x (px)</TableCell>
                                                <TableCell className='table-cell-results' align="center">y (px)</TableCell>
                                                <TableCell className='table-cell-results' align="center">Diamètre (mm) </TableCell>

                                            </TableRow>

                                        </TableHead>
                                        {JsonContent[nameFileRes].length > 0 ?

                                            <TableBody className='table-body-results'>
                                                
                                                {JsonContent[nameFileRes].map((item, i) => (

                                                        <TableRow
                                                            key={i}
                                                        >
                                                            <TableCell align="center">{item.x}</TableCell>
                                                            <TableCell align="center">{item.y}</TableCell>
                                                            <TableCell align="center">{item.diam}</TableCell>

                                                        </TableRow>



                                                    ))}
                                                
                                            </TableBody> :
                                            <TableBody>

                                                <TableRow>

                                                    <TableCell align="center">aucun résultat</TableCell>
                                                    <TableCell align="center">aucun résultat</TableCell>
                                                    <TableCell align="center">aucun résultat</TableCell>

                                                </TableRow>

                                            </TableBody>}
                                        
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                        <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                    </div>
                    : resultAction === "localisation" ?
                        <div>
                            <div className="display-results">
                                <img src={noCam} alt="resultats camera" className="no-cam-results" />
                                <div className="table-results">

                                    <div className='header-results-diam'>

                                    </div>
                                    <TableContainer className='table-rows-results'>
                                        <Table stickyHeader>
                                            <TableHead>

                                                <TableRow>
                                                    <TableCell className='table-cell-results' align="center">x (m)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">y (m)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">z (m)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">alpha (rad)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">beta (rad)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">gamma (rad)</TableCell>

                                                </TableRow>

                                            </TableHead>
                                            {JsonContent[nameFileRes].length > 0 ?
                                                <TableBody >

                                                    {JsonContent[nameFileRes].map((item, i) => (


                                                        <TableRow
                                                            key={i}

                                                        >

                                                            <TableCell align="center">{Number.parseFloat(item.x).toFixed(2)}</TableCell>
                                                            <TableCell align="center">{Number.parseFloat(item.y).toFixed(2)}</TableCell>
                                                            <TableCell align="center">{Number.parseFloat(item.z).toFixed(2)}</TableCell>
                                                            <TableCell align="center">{Number.parseFloat(item.alpha).toFixed(2)}</TableCell>
                                                            <TableCell align="center">{Number.parseFloat(item.beta).toFixed(2)}</TableCell>
                                                            <TableCell align="center">{Number.parseFloat(item.gamma).toFixed(2)}</TableCell>

                                                        </TableRow>



                                                    ))}

                                                </TableBody> :
                                                <TableBody>

                                                    <TableRow>

                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>

                                                    </TableRow>

                                                </TableBody>}

                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div> :
                        <div>
                            <div className="display-results">
                                <img src={noCam} alt="resultats camera" className="no-cam-results" />
                                <div className="table-results">

                                    <div className='header-results-diam'>

                                    </div>
                                    <TableContainer className='table-rows-results'>
                                        <Table stickyHeader>
                                            <TableHead>

                                                <TableRow>
                                                    <TableCell className='table-cell-results' align="center">x (px)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">y (px)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">Diamètre (mm) </TableCell>
                                                    <TableCell className='table-cell-results' align="center">Conforme</TableCell>
                                                    <TableCell className='table-cell-results' align="center">Raison</TableCell>
                                                    <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>
                                                </TableRow>

                                            </TableHead>
                                            {listSimulated.length > 0 ?
                                                <TableBody >
                                                    {isOpen.length === 0 ? initIsOpen(listSimulated.length) : console.log("deja init")}
                                                    {listSimulated.map((item, i) => (


                                                            <TableRow
                                                                key={i}
                                                            >

                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.x}</TableCell> : <TableCell align="center">{item.x}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.y}</TableCell> : <TableCell align="center">{item.y}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.diam}</TableCell> : <TableCell align="center">{item.diam}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.conform}</TableCell> : <TableCell align="center">{item.conform}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform-reason" align="center">{item.reason}</TableCell> : <TableCell align="center">{item.reason}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={function (event) { setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); togglePopupResult(i); setOpenDetailsX(item.x); setOpenDetailsY(item.y); }} />
                                                                </IconButton></TableCell> : <TableCell align="center"></TableCell>}

                                                                {isOpen[i] && <PopUpResult
                                                                    content={<>
                                                                    <h3 className="popup-title-conformity">Trou ({popUpTrouX} px,{popUpTrouY} px, {popUpTrouDiam} mm, index {i})</h3>
                                                                        <img src={noCam} alt='image du trou' className='image-trou-conformity' />
                                                                        <button className="forcer-conform" onClick={function (event) { togglePopupResult(i); setForceConform(true); setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); handleToggleConformitySimulated(openDetailsX, openDetailsY); }}>Forcer conformite du trou</button>
                                                                        <button className="annuler-result" onClick={function (event) { togglePopupResult(i); setPopUpTrouX(""); setPopUpTrouY(""); setPopUpTrouDiam(""); }}>Annuler</button>

                                                                    </>}
                                                                />}

                                                            </TableRow>

                                                        ))}
                                                    
                                                </TableBody> :
                                                <TableBody>

                                                    <TableRow>

                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>

                                                    </TableRow>
                                                    
                                                </TableBody>}
                                            
                                        </Table>
                                    </TableContainer>

                                </div>
                            </div>
                            <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div>}
            </div>)
    } else { // Résultats réels


            return(
             <div className='middleResult-v2'>
                    <div className="box-return"><IconButton onClick={changePageToHist}><img src={returnArrow} alt="return button" className="return-icon-results"/></IconButton></div>
                    {memAction === "Identifier" ?
                        <div>
                            <div className="display-results">
                                <canvas id="img_ROS_id" width="800" height="500" className="no-cam-results"></canvas>
                                <div className="table-results">

                                    <div className='header-results-diam'></div>
                                    <TableContainer className='table-rows-results'>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className='table-cell-results' align="center">x (px)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">y (px)</TableCell>
                                                    <TableCell className='table-cell-results' align="center">Diamètre (mm) </TableCell>

                                                </TableRow>
                                            </TableHead>
                                            
                                            {nbTrousIdentification > 0 ?

                                                <TableBody>

                                                    {trousIdentification.map((item, i) => (

                                                            <TableRow
                                                                key={i}
                                                            >
                                                                <TableCell align="center">{item.x}</TableCell>
                                                                <TableCell align="center">{item.y}</TableCell>
                                                                <TableCell align="center">{item.diam}</TableCell>

                                                            </TableRow>

                                                        ))}
                                                    
                                                </TableBody> :
                                                <TableBody>

                                                    <TableRow>

                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>

                                                    </TableRow>

                                                </TableBody>}
                                            
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div>
                        : memAction === "Localiser la plaque" ?
                            <div>
                                <div className="display-results">
                                    <canvas id="img_ROS_loc" width="800" height="500" className="no-cam-results"></canvas>
                                    <div className="table-results">

                                        <div className='header-results-diam'></div>
                                        <TableContainer className='table-rows-results'>
                                            <Table stickyHeader>

                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className='table-cell-results' align="center">x (m)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">y (m)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">z (m)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">alpha (rad)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">beta (rad)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">gamma (rad)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">{Number.parseFloat(pos_x).toFixed(2)}</TableCell>
                                                        <TableCell align="center">{Number.parseFloat(pos_y).toFixed(2)}</TableCell>
                                                        <TableCell align="center">{Number.parseFloat(pos_z).toFixed(2)}</TableCell>
                                                        <TableCell align="center">{Number.parseFloat(pos_a).toFixed(2)}</TableCell>
                                                        <TableCell align="center">{Number.parseFloat(pos_b).toFixed(2)}</TableCell>
                                                        <TableCell align="center">{Number.parseFloat(pos_g).toFixed(2)}</TableCell>
                                                    </TableRow>
                                                </TableBody>

                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                                <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                            </div>
                            : memAction === "Deplacer le robot" ?
                            <div>
                                <div className="display-results">
                                    Déplacement du robot sur les trous jugés conformes terminé. 
                                </div>
                            </div>
                            :
                            <div>
                                <div className="display-results">
                                    <canvas id="img_ROS_q" width="800" height="500" className="no-cam-results"></canvas>
                                    <div className="table-results">

                                        <div className='header-results-diam'></div>
                                        <TableContainer className='table-rows-results'>
                                            <Table stickyHeader>

                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className='table-cell-results' align="center">x (m)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">y (m)</TableCell>
                                                        <TableCell className='table-cell-results' align="center">Diamètre (mm) </TableCell>
                                                        <TableCell className='table-cell-results' align="center">Conforme</TableCell>
                                                        <TableCell className='table-cell-results' align="center">Raison</TableCell>
                                                        <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                
                                                {nbTrousQualite > 0 ?
                                                
                                                <TableBody >
                                                    {trousQualite.map((item, i) => (
                                                            
                                                            <TableRow
                                                                key={i}
                                                            >

                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{Number.parseFloat(item.x).toFixed(2)}</TableCell> : <TableCell align="center">{Number.parseFloat(item.x).toFixed(2)}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{Number.parseFloat(item.y).toFixed(2)}</TableCell> : <TableCell align="center">{Number.parseFloat(item.y).toFixed(2)}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{(item.diam) * 2}</TableCell> : <TableCell align="center">{(item.diam) * 2}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">non</TableCell> : <TableCell align="center">oui</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform-reason" align="center">{item.raison}</TableCell> : <TableCell align="center">{item.raison}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={function (event) { setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); togglePopupResult(i); setOpenDetailsX(item.x); setOpenDetailsY(item.y); }} />
                                                                </IconButton></TableCell> : <TableCell align="center"></TableCell>}
                                                            
                                                            {isOpen[i] && <PopUpResult id="popup-trou" allImgTrous={allImgTrous} indice={i}
                                                                    content={<>
                                                                        <h3 className="popup-title-conformity">Trou ({Number.parseFloat(popUpTrouX).toFixed(2)} m,{Number.parseFloat(popUpTrouY).toFixed(2)} m, {popUpTrouDiam * 2} mm)</h3>
                                                                        <img src={allImgTrous[i]} alt="Img Trou" className="trou-results"/>
                                                                        <button className="forcer-conform" onClick={function (event) { togglePopupResult(i); setForceConform(true); setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); handleToggleConformity(openDetailsX, openDetailsY); }}>Forcer conformite du trou</button>
                                                                        <button className="annuler-result" onClick={function (event) { togglePopupResult(i); setPopUpTrouX(""); setPopUpTrouY(""); setPopUpTrouDiam(""); }}>Annuler</button>

                                                                </>}
                                                            >{console.log("index : ", i), console.log("allImgTrous[i] : ", allImgTrous[i])}</PopUpResult>}

                                                            </TableRow>
                                                        ))}
                                                   
                                                </TableBody> :
                                                <TableBody>

                                                    <TableRow>

                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat</TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>
                                                        <TableCell align="center">aucun résultat </TableCell>

                                                    </TableRow>
                                                   
                                                </TableBody>}

                                            </Table>
                                        </TableContainer>

                                    </div>
                                </div>
                                <button className="button-save-result" disabled={isOpen.includes(true)} onClick={saveResult}> Sauvegarder les résultats </button>
                            </div>}
            </div>)
    }

}

export default MiddleResultScreen_v2