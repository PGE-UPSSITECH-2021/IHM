import '../styles/HelpScreen.css'
import MenuBar from './MenuBar'


function HelpScreen({ currentPage, setCurrentPage }) {
    return (
        <div>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
        </div>
    )


}

export default HelpScreen