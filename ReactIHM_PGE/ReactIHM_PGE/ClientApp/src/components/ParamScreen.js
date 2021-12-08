import '../styles/ParamScreen.css'
import MenuBar from './MenuBar'


function ParamScreen({ currentPage, setCurrentPage }) {
    return (
        <div>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
        </div>
    )


}

export default ParamScreen