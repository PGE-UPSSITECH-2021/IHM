import '../styles/MiddleResultScreen_v2.css'
import React, { useState, useEffect, useRef } from 'react'
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


    // Identification
    const [trousIdentification, setTrousIdentification] = useState([]);
    const [nbTrousIdentification, setNbTrousIdentification] = useState(0);
    const [subscribedI, setSubscribedI] = useState(false);
    // ROS RECEPTION RESULTATS IDENTIFICATION
    function callbackResultatsIdentification(message) {
        console.log("Recuperation de resultats Identification :");
        console.log("Trous : ", message.trous);
        console.log("nbTrous : ", message.nbTrous);
        console.log("image : ", message.image);
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
        console.log("Recuperation de resultats Localisation :");
        console.log("x : ", message.x);
        console.log("y : ", message.y);
        console.log("z : ", message.z);
        console.log("a : ", message.a);
        console.log("b : ", message.b);
        console.log("g : ", message.g);
        console.log("image : ", message.image);
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
    var lst_id_canvas = [];
    const [trousQualite, setTrousQualite] = useState(trous_quali);
    const [nbTrousQualite, setNbTrousQualite] = useState(nb_trous_quali);
    const [subscribedQ, setSubscribedQ] = useState(false);
    const [allIDImgTrous, setAllIDImgTrous] = useState(lst_id_canvas);
    // ROS RECEPTION RESULTATS QUALITE
    function callbackResultatsQualite(message) {
        console.log("Recuperation de resultats Qualite :");
        console.log("Trous : ", message.trous);
        console.log("nbTrous : ", message.nbTrous);
        trous_quali = [...message.trous];
        nb_trous_quali = message.nbTrous;
        setTrousQualite(trous_quali);
        setNbTrousQualite(nb_trous_quali);

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

        console.log("nbTrousQualite : ", nbTrousQualite);
        for (var ind = 0; ind < nbTrousQualite; ind++) {
            var item = trousQualite[ind];
            console.log("item_q : ", item);
            var canvas_q_i = document.getElementById('img_ROS_q_'.concat(String(ind)));
            lst_id_canvas.push('img_ROS_q_'.concat(String(ind)));
            console.log("Canvas name : ", 'img_ROS_q_'.concat(String(ind)));
            if (canvas_q_i !== null) {
                var ctx_q_i = canvas_q_i.getContext('2d');
                //Création de l'image
                var img_q_i = new Image();
                //Fonction pour dessiner l'image sur le canvas dès son chargement
                img_q_i.onload = function () {
                    console.log("IMG TROU ONLOAD");
                    ctx_q_i.drawImage(img_q_i, 0, 0, 800, 500);
                };
                img_q_i.onerror = function () {
                    console.log("IMG TROU ERROR");
                }
                // Récupération de l'image dans le message ROS (image) et conversion en image jpg
                img_q_i.src = `data:image/png;base64,${item.image.data}`;
            } else {
                console.log("CANVAS NULL");
            }
        }

        // ID IMG DE CHAQUE TROU
        console.log("ALL CANVAS NAMES : ", lst_id_canvas);
        setAllIDImgTrous(lst_id_canvas);
        console.log("AllIDImgTrous : ", allIDImgTrous);

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

    function changePageToHist() {
        if (showHistory === false) {
            alert("TODO: PROPOSER SAUVEGARDE");
        }
        setPageRes(0);
        setShowHistory(true);
    }

    //Import/Export fichier.csv
    const csvFileCreator = require('csv-file-creator');

    var now = new Date();
    const moment = require('moment');

    const dateSaveResult = moment(now).format('DD/MM/YYYY');

    var csv_data = [
        ['FileName', 'date', 'plaque', 'action'],
        ['identification_2', dateSaveResult, 'tole plate', 'identification'],
        ['x', 'y', 'diam'],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [2, 2, 3],
        [5, 8, 3],
        [1, 9, 3]
    ];

    function saveResult() {
        alert("Sauvegarde effectuée !");
        /* csvFileCreator(nameFileRes, csv_data);
         const ctnt_action = csv_data[0][3];
         const ctnt_plaque = csv_data[0][4];
         const ctnt_date = csv_data[0][5];
         setResultAction(ctnt_action);
         setResultPlaque(ctnt_plaque);
         setResultDate(ctnt_date);*/
    }

    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupResult = () => {
        setIsOpen(!isOpen);
    }

    function chanegConformity() {
        setIsOpen(!isOpen);
        JsonContent[nameFileRes].sort(function (a, b) {
            var a1st = -1; //negative value means left item should appear first
            var b1st = 1; //positive value means right item should appear first
            var equal = 0; //zero means objects are equal
            //compare your object's property values and determine their order
            if (JsonContent[nameFileRes].action === "identification")
                if (b.diam < a.diam) {
                    return b1st;
                }
                else if (a.diam < b.diam) {
                    return a1st;
                }
                else {
                    return equal;
                }
            else {
                if (b.conform < a.conform) {
                    return b1st;
                }
                else if (a.conform < b.conform) {
                    return a1st;
                }
                else {
                    return equal;
                }
            }
        });

    }

    /* Gestion de la pagination */

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [dense, setDense] = React.useState(false);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - JsonContent[nameFileRes].length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
    const [popUpConform, setPopUpConform] = useState("");
    const [list, setList] = useState(trousQualite);

    function handleToggleConformity(x, y) {
        const newList = list.map((item) => {

            if (item.x === x && item.y === y) {
                const updatedItem = {
                    ...item,
                    conform: true,
                    reason: "aucune",
                };
                return updatedItem;
            }

            console.log("Display item");
            console.log(item);
            return item;
        });

        setList(newList);
        console.log("Nouvelle list");
        console.log(newList);

    }

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

    if (showHistory === true) {

 

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
                                    <Table>
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
                        <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                    </div>
                    : resultAction === "localisation" ?
                        <div>
                            <div className="display-results">
                                <img src={noCam} alt="resultats camera" className="no-cam-results" />
                                <div className="table-results">

                                    <div className='header-results-diam'>

                                    </div>
                                    <TableContainer className='table-rows-results'>
                                        <Table>
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
                            <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div> :
                        <div>
                            <div className="display-results">
                                <img src={noCam} alt="resultats camera" className="no-cam-results" />
                                <div className="table-results">

                                    <div className='header-results-diam'>

                                    </div>
                                    <TableContainer className='table-rows-results'>
                                        <Table>
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

                                                    {listSimulated.map((item, i) => (


                                                            <TableRow
                                                                key={i}
                                                            >

                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.x}</TableCell> : <TableCell align="center">{item.x}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.y}</TableCell> : <TableCell align="center">{item.y}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.diam}</TableCell> : <TableCell align="center">{item.diam}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center">{item.conform}</TableCell> : <TableCell align="center">{item.conform}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform-reason" align="center">{item.reason}</TableCell> : <TableCell align="center">{item.reason}</TableCell>}
                                                                {item.conform === "non" ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={function (event) { setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); togglePopupResult(); setOpenDetailsX(item.x); setOpenDetailsY(item.y); }} />
                                                                </IconButton></TableCell> : <TableCell align="center"></TableCell>}

                                                                {isOpen && <PopUpResult
                                                                    content={<>
                                                                        <h3 className="popup-title-conformity">Trou ({popUpTrouX} px,{popUpTrouY} px, {popUpTrouDiam} mm)</h3>
                                                                        <img src={noCam} alt='image du trou' className='image-trou-conformity' />
                                                                        <button className="forcer-conform" onClick={function (event) { togglePopupResult(); setForceConform(true); setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); handleToggleConformitySimulated(openDetailsX, openDetailsY); }}>Forcer conformite du trou</button>
                                                                        <button className="annuler-result" onClick={function (event) { togglePopupResult(); setPopUpTrouX(""); setPopUpTrouY(""); setPopUpTrouDiam(""); }}>Annuler</button>

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
                            <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div>}
            </div>)
    } else {


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
                                        <Table>
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
                            <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                        </div>
                        : memAction === "Localiser la plaque" ?
                            <div>
                                <div className="display-results">
                                    <canvas id="img_ROS_loc" width="800" height="500" className="no-cam-results"></canvas>
                                    <div className="table-results">

                                        <div className='header-results-diam'></div>
                                        <TableContainer className='table-rows-results'>
                                            <Table>

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
                                <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                            </div> :
                            <div>
                                <div className="display-results">
                                    <canvas id="img_ROS_q" width="800" height="500" className="no-cam-results"></canvas>
                                    <div className="table-results">

                                        <div className='header-results-diam'></div>
                                        <TableContainer className='table-rows-results'>
                                            <Table>

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

                                                    {list.map((item, i) => (


                                                            <TableRow
                                                                key={i}
                                                            >

                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{Number.parseFloat(item.x).toFixed(2)}</TableCell> : <TableCell align="center">{Number.parseFloat(item.x).toFixed(2)}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{Number.parseFloat(item.y).toFixed(2)}</TableCell> : <TableCell align="center">{Number.parseFloat(item.y).toFixed(2)}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">{(item.diam) * 2}</TableCell> : <TableCell align="center">{(item.diam) * 2}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center">non</TableCell> : <TableCell align="center">oui</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform-reason" align="center">{item.raison}</TableCell> : <TableCell align="center">{item.raison}</TableCell>}
                                                                {item.conforme === false ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={function (event) { setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); togglePopupResult(); setOpenDetailsX(item.x); setOpenDetailsY(item.y); }} />
                                                                </IconButton></TableCell> : <TableCell align="center"></TableCell>}

                                                                {isOpen && <PopUpResult
                                                                    content={<>
                                                                        <h3 className="popup-title-conformity">Trou ({popUpTrouX} px,{popUpTrouY} px, {popUpTrouDiam*2} mm)</h3>
                                                                        <img src={noCam} alt='image du trou' className='image-trou-conformity' />
                                                                        <button className="forcer-conform" onClick={function (event) { togglePopupResult(); setForceConform(true); setPopUpTrouX(item.x); setPopUpTrouY(item.y); setPopUpTrouDiam(item.diam); handleToggleConformity(openDetailsX, openDetailsY); }}>Forcer conformite du trou</button>
                                                                        <button className="annuler-result" onClick={function (event) { togglePopupResult(); setPopUpTrouX(""); setPopUpTrouY(""); setPopUpTrouDiam(""); }}>Annuler</button>

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
                                <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                            </div>}
            </div>)
    }

}

export default MiddleResultScreen_v2