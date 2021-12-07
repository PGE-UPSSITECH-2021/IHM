import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'
//import 'bootstrap/dist/css/bootstrap.min.css';


function ResultScreen({ currentPage, setCurrentPage }) {
    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage}/></span>
            {/*<span className='middle-result-screen'><MiddleResultScreen /></span>*/}
            <MiddleResultScreen />


        </div>)
}

export default ResultScreen