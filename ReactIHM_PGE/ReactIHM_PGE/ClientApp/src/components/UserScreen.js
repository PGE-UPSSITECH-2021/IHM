import '../styles/UserScreen.css'
import MenuBar from './MenuBar'


function UserScreen({ currentPage, setCurrentPage }) {
    return (
        <div>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
        </div>
    )


}

export default UserScreen