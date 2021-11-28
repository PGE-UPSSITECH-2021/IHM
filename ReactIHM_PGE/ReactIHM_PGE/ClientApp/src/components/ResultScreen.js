import '../styles/ResultScreen.css'
import MenuBar from './MenuBar'
import MiddleResultScreen from './MiddleResultScreen'

function ResultScreen() {
    return (
        <div className='mainResult'>
            <span className='menu-bar'><MenuBar /></span>
            <span className='middle-result-screen'><MiddleResultScreen /></span>
        </div>)
}

export default ResultScreen