/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React, { useState } from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from "@material-ui/core/Checkbox"
import '../styles/HistoryResults.css'
import { TablePagination } from '@material-ui/core'
import loupe from '../assets/loupe.png'
import { MdDeleteForever } from "react-icons/md";
import JsonData from '../files_results_history.json'


function HistoryResults({ setPageRes, nameFileRes, setNameFileRes, modeCo, setcsvArray, setCsvArray, setResultAction, resultAction, setResultPlaque, resultPlaque, setResultDate, resultDate, showHistory, setShowHistory, memAction, setMemAction}) {
    
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [dense, setDense] = React.useState(false);

    /* Gestion des checkboxes */

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = JsonData.map((n) => n.FileName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, files, action) => {
        const selectedIndex = selected.indexOf(files);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, files);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setNameFileRes(files);
        setSelected(newSelected);
        setResultAction(action);

    };

    const isSelected = (files) => selected.indexOf(files) !== -1

    /* Gestion de la pagination */

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - JsonData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function deleteRows() {
        alert("DELETE TO DO");
    }


    const handleClickDetails = (event) => {
        setPageRes(1);
        console.log(nameFileRes);
        console.log(resultAction);
    }

    JsonData.sort(function (a, b) {
        var a1st = -1; //negative value means left item should appear first
        var b1st = 1; //positive value means right item should appear first
        var equal = 0; //zero means objects are equal
        //compare your object's property values and determine their order
        if (b.date < a.date) {
            return b1st;
        }
        else if (a.diam < b.diam) {
            return a1st;
        }
        else {
            return equal;
        }
    });

    return (
        <div className='middle-results-history'>
            <div className='header-results-history'>
                <h1 className='table-head'> Historique des résultats </h1>
                {modeCo === 1 ? <span className="nb-select"> Nombre de fichiers sélectionnés :  {selected.length} </span> : <span></span>}
                {modeCo === 1 ? <MdDeleteForever alt='Suppression des élements' className="button-remove" onClick={deleteRows} /> : <span className="button-remove" />}

            </div>
            <TableContainer className='table-rows'>
                <Table>
                    <TableHead>
                        {modeCo === 1 ?
                            <TableRow>

                                <TableCell className='table-cell' padding="checkbox">
                                    <Checkbox

                                        numSelected={selected.length}
                                        rowCount={JsonData.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'Tout sélectionner',
                                        }}
                                    />
                                </TableCell>
                                <TableCell className='table-cell' align="center">Résultats</TableCell>
                                <TableCell className='table-cell' align="center">Date</TableCell>
                                <TableCell className='table-cell' align="center">Type de plaque</TableCell>
                                <TableCell className='table-cell' align="center">Action</TableCell>
                                <TableCell className='table-cell' align="center">Voir les résultats</TableCell>

                            </TableRow>
                            :
                            <TableRow>
                                <TableCell className='table-cell' padding="checkbox"> </TableCell>
                                <TableCell className='table-cell' align="center">Résultats</TableCell>
                                <TableCell className='table-cell' align="center">Date</TableCell>
                                <TableCell className='table-cell' align="center">Type de plaque</TableCell>
                                <TableCell className='table-cell' align="center">Action</TableCell>
                                <TableCell className='table-cell' align="center">Voir les résultats</TableCell>

                            </TableRow>
                        }
                    </TableHead>
                    {modeCo === 1 ?
                        <TableBody>

                            {(rowsPerPage > 0
                                ? JsonData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : JsonData).map(
                                    (row) => {

                                        const isItemSelected = isSelected(row.FileName);

                                        return (
                                            <TableRow
                                                role="checkbox"
                                                background-color="blue"
                                                key={row.FileName}
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.FileName, row.action)}
                                                        checked={isItemSelected}


                                                    />
                                                </TableCell>

                                                <TableCell align="center">{row.FileName}</TableCell>
                                                <TableCell align="center">{row.date}</TableCell>
                                                <TableCell align="center">{row.plaque}</TableCell>
                                                <TableCell align="center">{row.action}</TableCell>
                                                <TableCell align="center"><IconButton className="details-history" onClick={function (event) { setNameFileRes(row.FileName); setResultAction(row.action); handleClickDetails(); }}><img src={loupe} alt='Voir plus' class="button-details" /></IconButton>
                                                </TableCell>

                                            </TableRow>


                                        );
                                    })}
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

                            {(rowsPerPage > 0
                                ? JsonData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : JsonData).map(
                                    (row) => {

                                        return (
                                            <TableRow>
                                                <TableCell padding="checkbox"></TableCell>
                                                <TableCell align="center">{row.FileName}</TableCell>
                                                <TableCell align="center">{row.date}</TableCell>
                                                <TableCell align="center">{row.plaque}</TableCell>
                                                <TableCell align="center">{row.action}</TableCell>
                                                <TableCell align="center"><IconButton className="details-history" onClick={function (event) { setNameFileRes(row.FileName); setResultAction(row.action); handleClickDetails(); }}><img src={loupe} alt='Voir plus' class="button-details" /></IconButton>
                                                </TableCell>
                                            </TableRow>


                                        );
                                    })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >

                                </TableRow>
                            )}
                        </TableBody>
                    }
                    <TableFooter>
                        <TableRow>

                            <TablePagination
                                rowsPerPageOptions={[7]}
                                colSpan={5}
                                count={JsonData.length}
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
    );
}


export default HistoryResults;