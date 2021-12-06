import '../styles/StateBanner.css'
import moment from 'react-moment'

function StateBanner() {
    var now = new Date();
    const moment = require('moment');

    return (<div className='pge-statebanner_co'>
        <span className='date_co'>  {moment(now).format('DD/MM/YYYY')}</span>
    </div>)
}

export default StateBanner