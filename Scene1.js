var map;

class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        //player ship
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            //half of the spritesheet's width
            frameWidth: 90,
            frameHeight: 100
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
        this.anims.create( {
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
    }
}