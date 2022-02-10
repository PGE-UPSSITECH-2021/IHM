import '../styles/HelpScreen.css'
import MenuBar from './MenuBar'
import MiddleHelpScreen from './MiddleHelpScreen'

function HelpScreen({ pageRes, setPageRes, currentPage, setCurrentPage, modeCo, showHistory, setShowHistory, memAction, setMemAction }) {
    return (
        <div className="mainHelp">
            <span className='menu-bar'><MenuBar pageRes={pageRes} setPageRes={setPageRes} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} showHistory={showHistory} setShowHistory={setShowHistory}/></span>
            <span className="middle-help-screen" ><MiddleHelpScreen modeCo={modeCo}/></span>
        </div>
    )


}

export default HelpScreen