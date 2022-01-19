import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'
import HistoryResults from './HistoryResults'


function ResultScreen({ currentPage, setCurrentPage }) {
    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
            <HistoryResults />


        </div>)
}

export default ResultScreen