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

        //weather object created to get map .. still needs to be fixed
        var map = new Weather().mapName;
        console.log(map + "1");

        //if weather == weather preload weather spritesheet

        //rain
        this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
            //half of the spritesheet's width and height
            frameWidth: 266,
            frameHeight: 250
        });
        //lightning
        this.load.spritesheet("lightning", "assets/spritesheets/lightning.png", {
            frameWidth:266,
            frameHeight: 250
        });
        //snow
        this.load.spritesheet("snow", "assets/spritesheets/snow.png", {
            frameWidth:800,
            frameHeight: 600
        });
        //clouds
        this.load.spritesheet("cloudy", "assets/spritesheets/cloudy.png", {
            frameWidth:800,
            frameHeight: 600
        });

        //sound files
        this.load.audio("rain_audio", ["assets/audio/rain.ogg"]);
        this.load.audio("music", ["assets/audio/star_fighters_theme.wav"]);
    }

    create() {
        this.scene.start("playGame");

        this.anims.create( {
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create( {
            key: "rain_anim",
            frames: this.anims.generateFrameNumbers("rain"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create( {
            key: "lightning_anim",
            frames: this.anims.generateFrameNumbers("lightning"),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create( {
            key: "snow_anim",
            frames: this.anims.generateFrameNumbers("snow"),
            frameRate: 5,
            repeat: -1
        });
        //framerate or spritesheet may need work   
        this.anims.create( {
            key: "cloudy_anim",
            frames: this.anims.generateFrameNumbers("cloudy"),
            frameRate: 2,
            repeat: -1
        });       
    }
}