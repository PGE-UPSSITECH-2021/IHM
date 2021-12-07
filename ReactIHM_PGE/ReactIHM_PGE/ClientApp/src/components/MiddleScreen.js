import '../styles/MiddleScreen.css'
import noCam from '../assets/NoCamera.png' // a garder pour la démo
import 'eventemitter2'
import * as ROSLIB from 'roslib';


var ros = new ROSLIB.Ros({
    url : 'ws://192.168.101.172:9090'
})
// Fonction appelée une fois la connexion établie
ros.on('connection', function () {
    console.log('Connected to websocket server.');
});

// Fonction appelée en cas d'erreur de connexion
ros.on('error', function (error) {
    console.log('Error connecting to websocket server: ', error);
});

// Fonction appelée une fois la connexion fermé
ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});

function callbackImage(message) {
    // Log console
    console.log('Received message on ' + image_listener.name);

    // Récupération du canvas sur la pages
    var canvas = document.getElementById('img_ROS');
    if (canvas !== null) {
        var ctx = canvas.getContext('2d');

        // Création d'une image
        var image = new Image();

        // Fonction pour déssiner l'image sur le canvas dès son chargement
        image.onload = function () {
            ctx.drawImage(image, 0, 0, 800, 500);
        };

        // Récupération de l'image dans le message ROS (data) et conversion en image PNG 
        image.src = `data:image/png;base64,${message.data}`;
    } else {
        console.log("canvas null");
    }
}

// Création du listener ROS
var image_listener = new ROSLIB.Topic({
    ros: ros,
    name: '/image/compressed', // Choix du topic
    messageType: 'sensor_msgs/CompressedImage' // Type du message transmis
});
image_listener.subscribe(callbackImage);
// Affectation de la fonction de callback



function MiddleScreen() {
    return (
        <div className='middle'>
            <canvas id="img_ROS" width="800" height="500" className="img-noCamera"></canvas>
        </div>
    )
}
export default MiddleScreen
