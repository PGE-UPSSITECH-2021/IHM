/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/TopBanner.css'
import logo from '../assets/logo.png'
import logo_upssi from '../assets/logoDBRIF.png'


function TopBanner() { // Top Banner commune à tous les écrans
	return (<div className='pge-topbanner'>
        <h1 className='pge-title'>Dispositif Sauron</h1>
        <img src={logo} alt='logo eXcent' className='pge-logo-eXcent' />
        <img src={logo_upssi} alt='logo upssitech' className='pge-logo-upssi' />
    </div>)
}

export default TopBanner