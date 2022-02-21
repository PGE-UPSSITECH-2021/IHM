/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/StateBanner.css'

function StateBanner() { // Barre d'état pour écran de connexion
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner_co'>
        <span className='date_co'>  {moment(now).format('DD/MM/YYYY')}</span>
    </div>)
}

export default StateBanner