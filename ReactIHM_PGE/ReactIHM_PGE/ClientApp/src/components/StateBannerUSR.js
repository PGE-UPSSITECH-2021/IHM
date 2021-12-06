import '../styles/StateBannerUSR.css'
import moment from 'react-moment';


function callbackSelectedAction(message) {
    console.log('Received message on ' + selectedAction_listener.name)
}

var selectedAction_listener = new ROSLIB.Topic({
    ros: ros,
    name: '/message_ihm_run',
    messageType: 'test_com/test_msg'
});
selectedAction_listener.subscribe(callbackSelectedAction);

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