import '../styles/StateBannerUSR.css'

function StateBannerUSR({ actionEnCours }) {
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner'>
        <span className='date'> {moment(now).format('DD/MM/YYYY')}</span>
        <span className='recette'> {actionEnCours} </span>
        <span className='mode'> Utilisateur </span>
    </div>)
}

export default StateBannerUSR