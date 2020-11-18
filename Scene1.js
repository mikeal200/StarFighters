class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        //player ship
        this.load.spritesheet("player", "assets/spritesheets/player.png", {
            frameWidth: 90,
            frameHeight: 100
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
    }
}