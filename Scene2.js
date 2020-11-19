class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        /*//rain sprite added to canvas
        this.rain = this.add.sprite(0, 0, "rain");
        this.rain.setOrigin(0, 0);
        this.rain.setScale(3.2);
        this.rain.play("rain_anim");*/

        /*//lightning sprite added to canvas
        this.lightning = this.add.sprite(0, 0, "lightning");
        this.lightning.setOrigin(0, 0);
        this.lightning.setScale(3.2);
        this.lightning.play("lightning_anim");*/

        //snow sprite added to canvas
        this.snow = this.add.sprite(0, 0, "snow");
        this.snow.setOrigin(0, 0);
        //this.snow.setScale(3.2);
        this.snow.play("snow_anim");

        //player sprite added to canvas
        this.player = this.add.sprite(this.game.config.width / 2 - 50, this.game.config.height / 2, "player");
        this.player.play("player_anim");


        this.rainSound = this.sound.add("rain_audio");
        //ambient noise config
        var ambConfig = {
            mute: false,
            volume: .1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.rainSound.play(ambConfig);
    }
}