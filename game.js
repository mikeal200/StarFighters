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
}

var db = new localdb('Scores'); 
//db.dropTable('highScores');
/*db.createTable('highScores');
db.insert('highScores', {'score': 0});
var table = db.exportData('highScores');
console.log(table);*/
