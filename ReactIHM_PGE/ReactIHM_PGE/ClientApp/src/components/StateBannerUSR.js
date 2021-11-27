import '../styles/StateBannerUSR.css'

function StateBannerUSR() {
    var now = new Date();
    var annee = now.getFullYear();
    var mois = now.getMonth() + 1;
    var jour = now.getDate();
    return (<div className='pge-statebanner'>
        <span className='date'> {jour}/{mois}/{annee}</span>
        <span className='recette'> Aucune action en cours </span>
        <span className='mode'> Utilisateur </span>
    </div>)
}

export default StateBannerUSR