import '../styles/StateBannerUSR.css'

function StateBannerUSR({ actionEnCours, modeCo }) {
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner'>
        <span className='date'> {moment(now).format('DD/MM/YYYY')}</span>
        <span className='recette'> {actionEnCours} </span>
        {modeCo === 0 ? <span className='mode'> Utilisateur </span> : modeCo === 1 ? <span className='mode'> Administrateur </span> : <span className='mode'> Maintenance </span>}
    </div>)
}

export default StateBannerUSR