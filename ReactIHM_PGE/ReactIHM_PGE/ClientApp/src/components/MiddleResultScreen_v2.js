import '../styles/MiddleResultScreen_v2.css'
import React, { useState, useEffect, useRef } from 'react'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import '../styles/HistoryResults.css'
import { TablePagination } from '@material-ui/core'
import loupe from '../assets/loupe.png'
import '../styles/bootstrapStyle.scss'
import returnArrow from "../assets/returnArrow.png"
import noCam from '../assets/NoCamera.png'
import fs from "fs";
import JsonContent from '../file_results.json'


function MiddleResultScreen_v2({ setPageRes, nameFileRes, setNameFileRes, csvArray, setCsvArray, selectedAction, setResultAction, resultAction, setResultPlaque, resultPlaque, setResultDate, resultDate }) {


    function changePageToHist() {
        setPageRes(0);
    }

    //Import/Export fichier.csv
    const csvFileCreator = require('csv-file-creator');

    var now = new Date();
    const moment = require('moment');

    const dateSaveResult = moment(now).format('DD/MM/YYYY');

    var csv_data = [
        ['', '', ''],
        ['', '', ''],
        ['x', 'y', 'diam'],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [2, 2, 3],
        [5, 8, 3],
        [1, 9, 3]
    ];

    function saveResult() {

        csvFileCreator(nameFileRes, csv_data);

        const ctnt_action = csv_data[0][3];
        const ctnt_plaque = csv_data[0][4];
        const ctnt_date = csv_data[0][5];
        setResultAction(ctnt_action);
        setResultPlaque(ctnt_plaque);
        setResultDate(ctnt_date);
    }



    return (
        <div className='middleResult-v2'>
            <div className="box-return"><img src={returnArrow} alt="return button" className="return-icon-results" onClick={changePageToHist} /></div>
            {resultAction === "identification" ?
                <div>
                    <div className="display-results-identification">
                        <img src={noCam} alt="resultats camera" className="no-cam-results" />
                        <div className="table-results-identification">

                            <div className='header-results-diam-identification'>

                            </div>
                            <TableContainer className='table-rows-results-identification'>
                                <Table>
                                    <TableHead>

                                        <TableRow>
                                            <TableCell className='table-cell-results-identification' align="center">x</TableCell>
                                            <TableCell className='table-cell-results-identification' align="center">y</TableCell>
                                            <TableCell className='table-cell-results-identification' align="center">Diamètre </TableCell>
                                            <TableCell className='table-cell-results-identification' align="center">Voir le trou</TableCell>

                                        </TableRow>

                                    </TableHead>
                                    {JsonContent[nameFileRes].length > 0 ?
                                       
                                        <TableBody >

                                            {JsonContent[nameFileRes].map((item, i) => (


                                                <TableRow
                                                    key={i}
                                                >

                                                    <TableCell align="center">{item.x}</TableCell>
                                                    <TableCell align="center">{item.y}</TableCell>
                                                    <TableCell align="center">{item.diam}</TableCell>
                                                    <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" /></IconButton>
                                                    </TableCell>

                                                </TableRow>



                                            ))}

                                        </TableBody> :
                                        <TableBody>

                                            <TableRow>

                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat </TableCell>

                                            </TableRow>

                                        </TableBody>}
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    <button className="button-save-result-identification" onClick={saveResult}> Sauvegarder les résultats </button>
                </div>
                : resultAction === "localisation" ?
                    <div>
                        <div className="display-results-localisation">
                            <img src={noCam} alt="resultats camera" className="no-cam-results" />
                            <div className="table-results-localisation">

                                <div className='header-results-diam-localisation'>

                                </div>
                                <TableContainer className='table-rows-results-localisation'>
                                    <Table>
                                        <TableHead>

                                            <TableRow>
                                                <TableCell className='table-cell-results-localisation' align="center">x</TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">y</TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">z </TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">alpha</TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">beta</TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">gamma</TableCell>
                                                <TableCell className='table-cell-results-localisation' align="center">Voir le trou</TableCell>

                                            </TableRow>

                                        </TableHead>
                                        {JsonContent[nameFileRes].length > 0 ?
                                            <TableBody >

                                                {JsonContent[nameFileRes].map((item, i) => (


                                                    <TableRow
                                                        key={i}
                                                        
                                                    >

                                                        <TableCell align="center">{item.x}</TableCell>
                                                        <TableCell align="center">{item.y}</TableCell>
                                                        <TableCell align="center">{item.z}</TableCell>
                                                        <TableCell align="center">{item.alpha}</TableCell>
                                                        <TableCell align="center">{item.beta}</TableCell>
                                                        <TableCell align="center">{item.gamma}</TableCell>
                                                        <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" /></IconButton>
                                                        </TableCell>

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
                                                    <TableCell align="center">aucun résultat </TableCell>

                                                </TableRow>

                                            </TableBody>}
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                        <button className="button-save-result-localisation" onClick={saveResult}> Sauvegarder les résultats </button>
                    </div> :
                    <div>
                        <div className="display-results-qualite">
                            <img src={noCam} alt="resultats camera" className="no-cam-results" />
                            <div className="table-results-qualite">

                                <div className='header-results-diam-qualite'>

                                </div>
                                    <TableContainer  className='table-rows-results-qualite'>
                                        <Table>
                                        <TableHead>

                                            <TableRow>
                                                <TableCell className='table-cell-results-qualite' align="center">x</TableCell>
                                                <TableCell className='table-cell-results-qualite' align="center">y</TableCell>
                                                <TableCell className='table-cell-results-qualite' align="center">Conforme</TableCell>
                                                <TableCell className='table-cell-results-qualite' align="center">Raison</TableCell>
                                                <TableCell className='table-cell-results-qualite' align="center">Voir le trou</TableCell>
                                            </TableRow>

                                        </TableHead>
                                        {JsonContent[nameFileRes].length > 0 ?
                                            <TableBody >

                                                {JsonContent[nameFileRes].map((item, i) => (


                                                    <TableRow
                                                        key={i}
                                                        sort={item.conform}
                                                    >

                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.x}</TableCell> : <TableCell align="center">{item.x}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.y}</TableCell> : <TableCell align="center">{item.y}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.conform}</TableCell> : <TableCell align="center">{item.conform}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform-reason" align="center">{item.reason}</TableCell> : <TableCell align="center">{item.reason}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" /></IconButton> </TableCell> : <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" /></IconButton></TableCell>}
                                                        

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

                                                </TableRow>

                                            </TableBody>}
                                    </Table>
                                    </TableContainer>
                                   
                            </div>
                        </div>
                        <button className="button-save-result-qualite" onClick={saveResult}> Sauvegarder les résultats </button>
                    </div>}



        </div>
    )

}

export default MiddleResultScreen_v2