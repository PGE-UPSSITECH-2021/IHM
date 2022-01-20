import '../styles/HelpScreen.css'
import MenuBar from './MenuBar'


function HelpScreen({ currentPage, setCurrentPage, modeCo }) {
    return (
        <div>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} /></span>
        </div>
    )


}

export default HelpScreen