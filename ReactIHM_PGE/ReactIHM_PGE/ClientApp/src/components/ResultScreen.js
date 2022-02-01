import '../styles/ResultScreen.css'
import React, { useState } from "react";
import MenuBar from './MenuBar'
import MiddleResultScreen_v2 from './MiddleResultScreen_v2'
import HistoryResults from './HistoryResults'


function ResultScreen({ currentPage, setCurrentPage, modeCo }) {

    const [pageRes, setPageRes] = useState(0);
    const [nameFileRes, setNameFileRes] = useState("");
    const [resultAction, setResultAction] = useState("");
    const [resultPlaque, setResultPlaque] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [csvArray, setCsvArray] = useState([]);

    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            {pageRes === 0 ?
                <HistoryResults setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} modeCo={modeCo} csvArray={csvArray} setCsvArray={setCsvArray} setResultAction={setResultAction} resultAction={resultAction} setResultPlaque={setResultPlaque} resultPlaque={resultPlaque} setResultDate={setResultDate} resultDate={resultDate} />
                : <MiddleResultScreen_v2 setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} csvArray={csvArray} setCsvArray={setCsvArray} setResultAction={setResultAction} resultAction={resultAction} setResultPlaque={setResultPlaque} resultPlaque={resultPlaque} setResultDate={setResultDate} resultDate={resultDate} />
            }

        </div>)
}

export default ResultScreen