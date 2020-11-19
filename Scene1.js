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

        //weather object created to get map
        var map = new Weather().mapName;
        console.log(map + "1");

        //if weather == weather preload weather spritesheet

        this.load.spritesheet("rain", "assets/spritesheets/rain.png", {
            //half of the spritesheet's width and height
            frameWidth: 266,
            frameHeight: 250
        });
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
        })        
    }
}