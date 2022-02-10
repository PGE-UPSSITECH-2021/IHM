﻿import '../styles/ResultScreen.css'
import React, { useState } from "react";
import MenuBar from './MenuBar'
import MiddleResultScreen_v2 from './MiddleResultScreen_v2'
import HistoryResults from './HistoryResults'


function ResultScreen({ pageRes, setPageRes, currentPage, setCurrentPage, modeCo, showHistory, setShowHistory, memAction, setMemAction, ros }) {

    const [nameFileRes, setNameFileRes] = useState("");
    const [resultAction, setResultAction] = useState("");
    const [resultPlaque, setResultPlaque] = useState("");
    const [resultDate, setResultDate] = useState("");
    const [csvArray, setCsvArray] = useState([]);


    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar pageRes={pageRes} setPageRes={setPageRes} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} showHistory={showHistory} setShowHistory={setShowHistory} /></span>
            {pageRes === 0 && showHistory === true ?
                <HistoryResults setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} modeCo={modeCo} csvArray={csvArray} setCsvArray={setCsvArray} setResultAction={setResultAction} resultAction={resultAction} setResultPlaque={setResultPlaque} resultPlaque={resultPlaque} setResultDate={setResultDate} resultDate={resultDate}
                    showHistory={showHistory} setShowHistory={setShowHistory} memAction={memAction} setMemAction={setMemAction} />
                : <MiddleResultScreen_v2 setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} csvArray={csvArray} setCsvArray={setCsvArray} setResultAction={setResultAction} resultAction={resultAction} setResultPlaque={setResultPlaque} resultPlaque={resultPlaque} setResultDate={setResultDate} resultDate={resultDate}
                    showHistory={showHistory} setShowHistory={setShowHistory} memAction={memAction} setMemAction={setMemAction} ros={ros} />
            }

        </div>)
}

export default ResultScreen