import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'
//import 'bootstrap/dist/css/bootstrap.min.css';


function ResultScreen() {
    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar /></span>
            {/*<span className='middle-result-screen'><MiddleResultScreen /></span>*/}
            <MiddleResultScreen />


        </div>)
}

export default ResultScreen