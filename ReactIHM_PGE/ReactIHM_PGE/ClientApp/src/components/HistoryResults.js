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
import suppress from '../assets/delete_histo.png'
import loupe from '../assets/loupe.png'
import MiddleResultScreen from './MiddleResultScreen';

function HistoryResults() {

    function createData(files, date, plaque, action) {
        return { files, date, plaque, action };
    }// add data
    const rows = [
        createData('config_01', '20-01-2022', '�paisse', 'localisation'),
        createData('config_02', '19-01-2022', 'cintr�e', 'identification'),
        createData('config_03', '18-01-2022', 'plate', 'localisation'),
        createData('config_04', '17-01-2022', '�paisse', 'identification'),
        createData('config_05', '16-01-2022', '�paisse', 'identification'),
        createData('config_06', '16-01-2022', '�paisse', 'identification'),
        createData('config_07', '16-01-2022', '�paisse', 'identification'),
        createData('config_08', '16-01-2022', '�paisse', 'identification'),
        createData('config_09', '16-01-2022', 'plate', 'localisation')
    ]

    const [checked, setChecked] = useState({});
    const handleChange = (event, row) => {
        setChecked({ id: row.id, check: event.target.checked });
    };
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [dense, setDense] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.files);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, files) => {
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

        setSelected(newSelected);
    };

    const isSelected = (files) => selected.indexOf(files) !== -1

    /* Gestion de la pagination */

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const changeHistoryToResults = () => {
        <MiddleResultScreen />
    }


    function boxChecked() {
        if (isSelected) {
            return true;
        }
    }

    function deleteRows() {

    }


    return (
        <div className='middle-results-history'>
            <div className='header-results-history'>
                <h1 className='table-head'> Historique des resultats </h1>
                <span className="nb-select"> Nombre de fichiers s�lectionn�s :  {selected.length} </span>
                <img src={suppress} alt='Suppression des �lements' className="button-remove" onClick={deleteRows} />

            </div>
            <TableContainer className='table-rows'>
                <Table>
                    <TableHead>

                        <TableRow>

                            <TableCell className='table-cell' padding="checkbox">
                                <Checkbox

                                    numSelected={selected.length}
                                    rowCount={rows.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'Tout s�lectionner',
                                    }}
                                />
                            </TableCell>
                            <TableCell className='table-cell' align="center">R�sultats</TableCell>
                            <TableCell className='table-cell' align="center">Date</TableCell>
                            <TableCell className='table-cell' align="center">Type de plaque</TableCell>
                            <TableCell className='table-cell' align="center">Action</TableCell>
                            <TableCell className='table-cell' align="center">Voir les r�sultats</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => {
                            const isItemSelected = isSelected(row.files);
                            return (
                                <TableRow
                                    role="checkbox"
                                    background-color="blue"
                                    key={row.files}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    onClick={(event) => handleClick(event, row.files)}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}


                                        />
                                    </TableCell>

                                    <TableCell align="center">{row.files}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.plaque}</TableCell>
                                    <TableCell align="center">{row.action}</TableCell>
                                    <TableCell align="center"><IconButton className="details-history"><img src={loupe} alt='Voir plus' class="button-details" /></IconButton>
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
                    <TableFooter>
                        <TableRow>

                            <TablePagination
                                rowsPerPageOptions={[7]}
                                colSpan={5}
                                count={rows.length}
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