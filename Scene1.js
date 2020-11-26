class Scene1 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "clearMap");
        this.background.setOrigin(0, 0);

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

        /*//snow sprite added to canvas
        this.snow = this.add.sprite(0, 0, "snow");
        this.snow.setOrigin(0, 0);
        this.snow.play("snow_anim");*/

        /*//cloud sprite added to canvas
        this.cloudy = this.add.sprite(0, 0, "cloudy");
        this.cloudy.setOrigin(0, 0);
        this.cloudy.play("cloudy_anim");*/

        /*//fog sprite added to canvas
        this.fog = this.add.sprite(0, 0, "fog");
        this.fog.setOrigin(0, 0);
        this.fog.play("fog_anim");*/

        //player sprite added to canvas
        this.player = this.physics.add.sprite(this.game.config.width / 2 - 50, this.game.config.height / 2, "player");
        this.player.play("player_anim");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        //rain sounds
        /*this.rainSound = this.sound.add("rain_audio");
        //ambient noise config
        var ambConfig = {
            mute: false,
            //volume may need to be changed
            volume: .05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.rainSound.play(ambConfig);*/

        this.music = this.sound.add("music");
        var musicConfig = {
            mute: false,
            volume: .5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
    }

    update() {
        this.movePlayerManager();
    }

    movePlayerManager() {
        if(this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed); 
        }
        else { 
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else { 
            this.player.setVelocityY(0);
        }
    }
}