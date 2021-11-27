import '../styles/MainScreenUSR.css'
import Configuration from './Configuration'
import MenuBar from './MenuBar'
import MiddleScreen from './MiddleScreen'

function MainScreenUSR() {
    return (
        <div className='main'>
            <span className='menu-bar'><MenuBar /></span>
            <span className='middle-screen'><MiddleScreen /></span>
            <span className='configuration'><Configuration /></span >
        </div>)
}

export default MainScreenUSR