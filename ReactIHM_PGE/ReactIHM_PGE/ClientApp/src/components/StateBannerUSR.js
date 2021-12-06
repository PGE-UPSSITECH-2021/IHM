import '../styles/StateBannerUSR.css'
import moment from 'react-moment';

function StateBannerUSR() {
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner'>
        <span className='date'> {moment(now).format('DD/MM/YYYY')}</span>
        <span className='recette'> Action en cours </span>
        <span className='mode'> Utilisateur </span>
    </div>)
}

export default StateBannerUSR