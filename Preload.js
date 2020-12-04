var mapName = "clearMap", spriteName, animName, animSound, animScale = 1;

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

        //explosion spritesheet
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });

        //we dont have any other maps yet
        this.load.image("clearMap", "assets/maps/clearMap.png");

        //if weather == weather preload weather spritesheet
        switch(map) {
            case "thunderstorm":
                this.load.spritesheet("lightning", "assets/spritesheets/lightning.png", {
                    frameWidth:266,
                    frameHeight: 250
                });
                spriteName = "thunderstorm";
                animScale = 3.2;
                break;
            case "drizzle":
                this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
                    //half of the spritesheet's width and height
                    frameWidth: 266,
                    frameHeight: 250
                });
                spriteName = "drizzle";
                this.load.audio("rain_audio", ["assets/audio/rain.ogg"]);
                animSound = "rain_audio";
                animScale = 3.2;
                break;
            case "rain":
                this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
                    //half of the spritesheet's width and height
                    frameWidth: 266,
                    frameHeight: 250
                });
                spriteName = "rain";
                this.load.audio("rain_audio", ["assets/audio/rain.ogg"]);
                animSound = "rain_audio";
                animScale = 3.2;
                break;
            case "snow":
                this.load.spritesheet("snow", "assets/spritesheets/snow.png", {
                    frameWidth:800,
                    frameHeight: 600
                });
                spriteName = "snow";
                break;
            case "clear":
                //this.load.image("clearMap", "assets/maps/clearMap.png");
                //mapName = "clearMap"
                break;
            case "clouds":
                this.load.spritesheet("cloudy", "assets/spritesheets/cloudy.png", {
                    frameWidth:800,
                    frameHeight: 600
                });
                spriteName = "cloudy";
                break;
            default: 
                this.load.spritesheet("fog", "assets/spritesheets/fog.png", {
                    frameWidth: 840,
                    frameHeight: 640
                });
                spriteName = "fog";
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

        //missile spritesheet
        this.load.spritesheet("missile", "assets/spritesheets/missile.png", {
            frameWidth: 108,
            frameHeight: 417
        });

        //music 
        this.load.audio("music", ["assets/audio/star_fighters_theme.wav"]);
        //explosion sound
        this.load.audio("explosion", ["assets/audio/explosion.ogg"]);
        //player shooting sound
        this.load.audio("laser", ["assets/audio/laser.wav"]);
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
                animName = "lightning_anim";
                break;
            case "drizzle":
                this.anims.create( {
                    key: "drizzle_anim",
                    frames: this.anims.generateFrameNumbers("rain"),
                    frameRate: 10,
                    repeat: -1
                });
                animName = "drizzle_anim";
                break;
            case "rain":
                this.anims.create( {
                    key: "rain_anim",
                    frames: this.anims.generateFrameNumbers("rain"),
                    frameRate: 20,
                    repeat: -1
                });
                animName = "rain_anim";
                break;
            case "snow":
                this.anims.create( {
                    key: "snow_anim",
                    frames: this.anims.generateFrameNumbers("snow"),
                    frameRate: 5,
                    repeat: -1
                });
                animName = "snow_anim";
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
                animName = "cloudy_anim";
                break;
            default:
                //needs work 
                this.anims.create( {
                    key: "fog_anim",
                    frames: this.anims.generateFrameNumbers("fog"),
                    frameRate: 3,
                    repeat: -1
                });
                animName = "fog_anim";
                break;
        }
        //player anim
        this.anims.create( {
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
        //missile anim
        this.anims.create( {
            key: "missile_anim",
            frames: this.anims.generateFrameNumbers("missile"),
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
        this.anims.create( {
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
    }
}