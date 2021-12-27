import '../styles/UserScreen.css'
import MenuBar from './MenuBar'
import MiddleUserScreen from './MiddleUserScreen'


function UserScreen({ currentPage, setCurrentPage }) {
    return (
        <div className='main-usr-param'>
            <span className='menu-bar'><MenuBar currentPage={currentPage} setCurrentPage={setCurrentPage} /></span>
            <span className="mainUsrParam" > <MiddleUserScreen /></span>
        </div>
    )
}

export default UserScreen