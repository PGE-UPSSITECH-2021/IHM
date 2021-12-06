import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'
import ResultIndications from './ResultIndications'
//import 'bootstrap/dist/css/bootstrap.min.css';


function ResultScreen() {
    return (
        <div className='mainResult'>
            <span id='menu-bar'><MenuBar /></span>
            {/*<span className='middle-result-screen'><MiddleResultScreen /></span>*/}
            <MiddleResultScreen />


        </div>)
}

export default ResultScreen