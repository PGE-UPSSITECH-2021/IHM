import '../styles/HelpScreen.css'
import MenuBar from './MenuBar'
import MiddleHelpScreen from './MiddleHelpScreen'


function HelpScreen({ currentPage, setCurrentPage }) {
    return (
        <div className='mainHelp'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
            <MiddleHelpScreen />


        </div>
    )


}

export default HelpScreen