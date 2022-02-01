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
import returnArrow from "../assets/arrow_back.png"
import noCam from '../assets/NoCamera.png'
import fs from "fs";
import JsonContent from '../files_results.json'
import PopUpResult from './PopUpResult'


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

    //PopUp details result
    const [isOpen, setIsOpen] = useState(false);
    const togglePopupResult = () => {
        setIsOpen(!isOpen);
    }



    return (
        <div className='middleResult-v2'>
            <div className="box-return"><IconButton><img src={returnArrow} alt="return button" className="return-icon-results" onClick={changePageToHist} /></IconButton></div>
            {resultAction === "identification" ?
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
                                            <TableCell className='table-cell-results' align="center">x</TableCell>
                                            <TableCell className='table-cell-results' align="center">y</TableCell>
                                            <TableCell className='table-cell-results' align="center">Diamètre </TableCell>
                                            <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>

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
                                                <TableCell className='table-cell-results' align="center">x</TableCell>
                                                <TableCell className='table-cell-results' align="center">y</TableCell>
                                                <TableCell className='table-cell-results' align="center">z </TableCell>
                                                <TableCell className='table-cell-results' align="center">alpha</TableCell>
                                                <TableCell className='table-cell-results' align="center">beta</TableCell>
                                                <TableCell className='table-cell-results' align="center">gamma</TableCell>
                                                <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>

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
                                                <TableCell className='table-cell-results' align="center">x</TableCell>
                                                <TableCell className='table-cell-results' align="center">y</TableCell>
                                                <TableCell className='table-cell-results' align="center">Conforme</TableCell>
                                                <TableCell className='table-cell-results' align="center">Raison</TableCell>
                                                <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>
                                            </TableRow>

                                        </TableHead>
                                        {JsonContent[nameFileRes].length > 0 ?
                                            <TableBody >

                                                {JsonContent[nameFileRes].map((item, i) => (


                                                    <TableRow
                                                        key={i}
                                                    >

                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.x}</TableCell> : <TableCell align="center">{item.x}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.y}</TableCell> : <TableCell align="center">{item.y}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.conform}</TableCell> : <TableCell align="center">{item.conform}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform-reason" align="center">{item.reason}</TableCell> : <TableCell align="center">{item.reason}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={togglePopupResult} /></IconButton></TableCell> : <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={togglePopupResult} /></IconButton></TableCell>}


                                                    </TableRow>

                                                ))}{isOpen && <PopUpResult
                                                    content={<>
                                                        <h3 className="popup-title">id trou</h3>
                                                    </>}
                                                    handleClose={togglePopupResult}
                                                />}

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
                        <button className="button-save-result" disabled={isOpen} onClick={saveResult}> Sauvegarder les résultats </button>
                    </div>}



        </div>
    )

}

export default MiddleResultScreen_v2