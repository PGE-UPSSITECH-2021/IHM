function callbackImage(message) {
    // Log console
    console.log('Received message on ' + image_listener.name);

    // Récupération du canvas sur la pages
    var canvas = document.getElementById('Image_ROS');
    ctx = canvas.getContext('2d');

    // Création d'une image
    var image = new Image();

    // Fonction pour déssiner l'image sur le canvas dès son chargement
    image.onload = function () {
        ctx.drawImage(image, 0, 0, 480, 320);
    };

    // Récupération de l'image dans le message ROS (data) et conversion en image PNG 
    image.src = `data:image/png;base64,${message.data}`;
}

// Création du listener ROS
var image_listener = new ROSLIB.Topic({
    ros: ros,
    name: '/image/compressed', // Choix du topic
    messageType: 'sensor_msgs/CompressedImage' // Type du message transmis
});

// Affectation de la fonction de callback
image_listener.subscribe(callbackImage);