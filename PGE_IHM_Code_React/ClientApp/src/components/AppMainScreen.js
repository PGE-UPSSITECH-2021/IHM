import '../styles/AppMainScreen.css';
import TopBanner from './TopBanner';
import StateBannerUSR from './StateBannerUSR';
import MainScreenUSR from './MainScreenUSR';

function AppMainScreen() { // main screen Usr mode
    document.body.id = 'bodyMain';
    return (
        <div className='bodyMain'>
            <div className='topBanner'><TopBanner /></div>
            <div className='stateBanner'><StateBannerUSR /></div>
            <div className='main'><MainScreenUSR /></div>
        </div>)
}

export default AppMainScreen;
