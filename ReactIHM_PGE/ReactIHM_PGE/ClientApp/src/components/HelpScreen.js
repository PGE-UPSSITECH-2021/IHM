import '../styles/HelpScreen.css'
import MenuBar from './MenuBar'
import MiddleHelpScreen from './MiddleHelpScreen'

function HelpScreen({ currentPage, setCurrentPage, modeCo }) {
    return (
        <div>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
            <span className="middle-help-screen" ><MiddleHelpScreen /></span>
        </div>
    )


}

export default HelpScreen