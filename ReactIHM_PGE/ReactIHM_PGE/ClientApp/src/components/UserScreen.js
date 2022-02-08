import '../styles/UserScreen.css'
import MenuBar from './MenuBar'
import MiddleUserScreen from './MiddleUserScreen'


function UserScreen({ pageRes, setPageRes, currentPage, setCurrentPage, modeCo, showHistory, setShowHistory, memAction, setMemAction }) {
    return (
        <div className='main-usr-param'>
            <span className='menu-bar'><MenuBar pageRes={pageRes} setPageRes={setPageRes} currentPage={currentPage} setCurrentPage={setCurrentPage} modeCo={modeCo} showHistory={showHistory} setShowHistory={setShowHistory} /></span>
            <span className="mainUsrParam" > <MiddleUserScreen modeCo={modeCo} /></span>
        </div>
    )
}

export default UserScreen