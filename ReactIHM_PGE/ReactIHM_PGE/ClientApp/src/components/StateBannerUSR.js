/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import '../styles/StateBannerUSR.css'

function StateBannerUSR({ actionEnCours, modeCo, selectedTest }) { // Barre d'état pour tous les écrans sauf écran de connexion
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner'>
        <span className='date'> {moment(now).format('DD/MM/YYYY')}</span>
        {modeCo === 2 ? selectedTest === "" ? <span className='recette'> Aucun test en cours </span> : <span className='recette'> Evaluation du pole {selectedTest} en cours </span>
            : <span className='recette'> {actionEnCours} </span>}
        {modeCo === 0 ? <span className='mode'> Utilisateur </span> : modeCo === 1 ? <span className='mode'> Administrateur </span> : <span className='mode'> Maintenance </span>}
    </div>)
}

export default StateBannerUSR