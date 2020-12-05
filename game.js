window.onload = function() {

    gameSettings;

    var config = {
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        scene: [MainMenu, Preload, Scene1, GameOver],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    }
    var game = new Phaser.Game(config);
}

var gameSettings = {
    playerSpeed: 400,
    missileSpeed: 250,
    firingDelay: 500,
    alien1Score: 300,
    alien2Score: 100,
    alien3Score: 200,
    playerLives: 3,
    alien1Speed: 1,
    alien2Speed: 50,
    alien3Speed: 80,
    playerShield: 5,
    alienFireRate: 2000,
    score: 0,
    frame: 0,
}

var firebaseConfig = {
    apiKey: "AIzaSyBIKa8V035_oveCFNBas4NJiR9rEac7FG4",
    authDomain: "starfighters-11f6d.firebaseapp.com",
    databaseURL: "https://starfighters-11f6d-default-rtdb.firebaseio.com",
    projectId: "starfighters-11f6d",
    storageBucket: "starfighters-11f6d.appspot.com",
    messagingSenderId: "735700908052",
    appId: "1:735700908052:web:9e83ac0a760dd1a2d28f01"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

firebase.database().ref('highScore').once('value', function(childSnapshot) {
                
    childData = childSnapshot.val();
    score = childData.score;
});


