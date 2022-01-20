import '../styles/ResultScreen.css'
import React, { useState } from "react";
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'
import HistoryResults from './HistoryResults'


function ResultScreen({ currentPage, setCurrentPage, modeCo }) {

    const [pageRes, setPageRes] = useState(0);
    const [nameFileRes, setNameFileRes] = useState("");

    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            {pageRes === 0 ?
                <HistoryResults setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} />
                : <MiddleResultScreen setPageRes={setPageRes} nameFileRes={nameFileRes} setNameFileRes={setNameFileRes} />
            }

        </div>)
}

export default ResultScreen