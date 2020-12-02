var map;

class Preload extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        //creating loading bar config
        let loadingBar = this.add.graphics( {
            fillStyle: {
                color: 0xffffff
            }
        });
        //displaying loading bar between scenes
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, 300, 800 * percent, 50);
        })

        //player ship
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            //half of the spritesheet's width
            frameWidth: 90,
            frameHeight: 100
        });

        //Player missile
<<<<<<< Updated upstream
        this.load.spritesheet("missile", "assets/spritesheets/Missile.png", {
            frameWidth: 15,
            frameHeight: 15
=======
        this.load.image("missile", "assets/images/missile.png",{
            frameWidth:20,
            frameHeight:20
>>>>>>> Stashed changes
        });

        //callback function to fetch map
        getMap(function(mapFetched) {
            map = mapFetched
        });

        //if weather == weather preload weather spritesheet
        switch(map) {
        case "thunderstorm":
            this.load.spritesheet("lightning", "assets/spritesheets/lightning.png", {
                frameWidth:266,
                frameHeight: 250
            });
            break;
        case "drizzle":
            this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
                //half of the spritesheet's width and height
                frameWidth: 266,
                frameHeight: 250
            });
            break;
        case "rain":
            this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
                //half of the spritesheet's width and height
                frameWidth: 266,
                frameHeight: 250
            });
            this.load.audio("rain_audio", ["assets/audio/rain.ogg"]);
            break;
        case "snow":
            this.load.spritesheet("snow", "assets/spritesheets/snow.png", {
                frameWidth:800,
                frameHeight: 600
            });
            break;
        case "clear":
            this.load.image("clearMap", "assets/maps/clearMap.png");
            break;
        case "clouds":
            this.load.spritesheet("cloudy", "assets/spritesheets/cloudy.png", {
                frameWidth:800,
                frameHeight: 600
            });
            break;
        default: 
            this.load.spritesheet("fog", "assets/spritesheets/fog.png", {
                frameWidth: 840,
                frameHeight: 640
            });
            break;
        }

        //enemy spritesheets
        this.load.spritesheet("alien-1", "assets/spritesheets/alien-1.png", {
            frameWidth: 138,
            frameHeight: 155
        });
        this.load.spritesheet("alien-2", "assets/spritesheets/alien-2.png", {
            frameWidth: 266,
            frameHeight: 310
        });
        this.load.spritesheet("alien-3", "assets/spritesheets/alien-3.png", {
            frameWidth: 138,
            frameHeight: 155
        });

        //music 
        this.load.audio("music", ["assets/audio/star_fighters_theme.wav"]);
    }

    create() {
        this.scene.start("playGame");

        switch(map) {
            case "thunderstorm":
                this.anims.create( {
                    key: "lightning_anim",
                    frames: this.anims.generateFrameNumbers("lightning"),
                    frameRate: 15,
                    repeat: -1
                });
                break;
            case "drizzle":
                
                break;
            case "rain":
                this.anims.create( {
                    key: "rain_anim",
                    frames: this.anims.generateFrameNumbers("rain"),
                    frameRate: 20,
                    repeat: -1
                });
                break;
            case "snow":
                this.anims.create( {
                    key: "snow_anim",
                    frames: this.anims.generateFrameNumbers("snow"),
                    frameRate: 5,
                    repeat: -1
                });
                break;
            case "clear":    
                break;
            case "clouds":
                //framerate or spritesheet may need work 
                this.anims.create( {
                    key: "cloudy_anim",
                    frames: this.anims.generateFrameNumbers("cloudy"),
                    frameRate: 2,
                    repeat: -1
                });
                break;
            default:
                //needs work 
                this.anims.create( {
                    key: "fog_anim",
                    frames: this.anims.generateFrameNumbers("fog"),
                    frameRate: 3,
                    repeat: -1
                });
                break;
        }
        //player anim
        this.anims.create( {
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });

        //enemy anims
        this.anims.create( {
            key: "alien1_anim",
            frames: this.anims.generateFrameNumbers("alien-1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create( {
            key: "alien2_anim",
            frames: this.anims.generateFrameNumbers("alien-2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create( {
            key: "alien3_anim",
            frames: this.anims.generateFrameNumbers("alien-3"),
            frameRate: 20,
            repeat: -1
        });
    }
}