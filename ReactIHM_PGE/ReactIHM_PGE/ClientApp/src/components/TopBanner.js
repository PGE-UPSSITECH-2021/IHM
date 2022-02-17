import '../styles/TopBanner.css'
import logo from '../assets/logo.png'
import logo_upssi from '../assets/logoDBRIF.png'


function TopBanner() {
	return (<div className='pge-topbanner'>
        <h1 className='pge-title'>Dispositif Sauron</h1>
        <img src={logo} alt='logo eXcent' className='pge-logo-eXcent' />
        <img src={logo_upssi} alt='logo upssitech' className='pge-logo-upssi' />
    </div>)
}

export default TopBanner