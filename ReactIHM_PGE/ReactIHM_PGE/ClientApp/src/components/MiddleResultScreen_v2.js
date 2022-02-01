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
import IconButton from '@material-ui/core/IconButton'
import '../styles/HistoryResults.css'
import { TablePagination } from '@material-ui/core'
import loupe from '../assets/loupe.png'
import '../styles/bootstrapStyle.scss'
import returnArrow from "../assets/arrow_back.png"
import noCam from '../assets/NoCamera.png'
import JsonContent from '../data/file_results.json'
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
                                            <TableCell className='table-cell-results' align="center">Diamètre (mm) </TableCell>
                                            <TableCell className='table-cell-results' align="center">Voir le trou</TableCell>

                                        </TableRow>

                                    </TableHead>
                                    {JsonContent[nameFileRes].length > 0 ?

                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? JsonContent[nameFileRes].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : JsonContent[nameFileRes]).map((item, i) => (
                                               
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
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >

                                                </TableRow>
                                            )}

                                        </TableBody> :
                                        <TableBody>

                                            <TableRow>

                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat</TableCell>
                                                <TableCell align="center">aucun résultat</TableCell>

                                            </TableRow>

                                        </TableBody>}
                                    <TableFooter>
                                        <TableRow>

                                            <TablePagination
                                                rowsPerPageOptions={[7]}
                                                colSpan={4}
                                                count={JsonContent[nameFileRes].length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />

                                        </TableRow>

                                    </TableFooter>
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

                                                {(rowsPerPage > 0
                                                    ? JsonContent[nameFileRes].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : JsonContent[nameFileRes]).map((item, i) => (


                                                    <TableRow
                                                        key={i}
                                                    >

                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.x}</TableCell> : <TableCell align="center">{item.x}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.y}</TableCell> : <TableCell align="center">{item.y}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center">{item.conform}</TableCell> : <TableCell align="center">{item.conform}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform-reason" align="center">{item.reason}</TableCell> : <TableCell align="center">{item.reason}</TableCell>}
                                                        {item.conform === "no" ? <TableCell className="non-conform" align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={togglePopupResult} /></IconButton></TableCell> : <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" onClick={togglePopupResult} /></IconButton></TableCell>}
                                                        {isOpen && <PopUpResult
                                                            content={<>
                                                                <h3 className="popup-title">id trou</h3>
                                                            </>}
                                                            handleClose={togglePopupResult}
                                                        />}

                                                    </TableRow>

                                                ))}
                                                {emptyRows > 0 && (
                                                    <TableRow
                                                        style={{
                                                            height: (dense ? 33 : 53) * emptyRows,
                                                        }}
                                                    >

                                                    </TableRow>
                                                )}
                                            </TableBody> :
                                            <TableBody>

                                                <TableRow>

                                                    <TableCell align="center">aucun résultat</TableCell>
                                                    <TableCell align="center">aucun résultat</TableCell>
                                                    <TableCell align="center">aucun résultat</TableCell>
                                                    <TableCell align="center">aucun résultat </TableCell>
                                                    <TableCell align="center">aucun résultat </TableCell>

                                                </TableRow>
                                                {emptyRows > 0 && (
                                                    <TableRow
                                                        style={{
                                                            height: (dense ? 33 : 53) * emptyRows,
                                                        }}
                                                    >

                                                    </TableRow>
                                                )}
                                            </TableBody>}
                                        <TableFooter>
                                            <TableRow>

                                                <TablePagination
                                                    rowsPerPageOptions={[7]}
                                                    colSpan={5}
                                                    count={JsonContent[nameFileRes].length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />

                                            </TableRow>

                                        </TableFooter>
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