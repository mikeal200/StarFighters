class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //rain sprite added to canvas
        this.rain = this.add.sprite(0, 0, "rain");
        this.rain.setOrigin(0, 0);
        this.rain.setScale(3.2);
        this.rain.play("rain_anim");

        //player sprite added to canvas
        this.player = this.add.sprite(this.game.config.width / 2 - 50, this.game.config.height / 2, "player");
        this.player.play("player_anim");

    }
}