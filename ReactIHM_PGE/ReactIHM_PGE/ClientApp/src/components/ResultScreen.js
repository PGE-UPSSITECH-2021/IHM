import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'


function ResultScreen({ currentPage, setCurrentPage, modeCo }) {
    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo}/></span>
            <MiddleResultScreen />


        </div>)
}

export default ResultScreen