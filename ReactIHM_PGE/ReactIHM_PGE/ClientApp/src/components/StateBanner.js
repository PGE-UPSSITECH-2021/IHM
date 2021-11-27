import '../styles/StateBanner.css'

function StateBanner() {
    var now = new Date();
    var annee = now.getFullYear();
    var mois = now.getMonth() + 1;
    var jour = now.getDate();
    return (<div className='pge-statebanner_co'>
        <span className='date_co'> {jour}/{mois}/{annee}</span>
    </div>)
}

export default StateBanner