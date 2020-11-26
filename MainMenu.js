class MainMenu extends Phaser.Scene {
    constructor () {
        super({key: 'MainMenu'});
    }

    preload() {
        this.load.spritesheet('background', 'assets/spritesheets/mainmenu.png', {
            frameWidth: 810,
            frameHeight: 600
        });

        this.load.image('title', 'assets/images/title.png');
        this.load.image('playButton', 'assets/images/playButton.png');
    }

    create() {
        this.add.image(0, 0, "title").setOrigin(0).setDepth(1);
        let playButton = this.add.image(365, 300, 'playButton').setOrigin(0).setDepth(2);

        this.anims.create( {
            key: "background_anim",
            frames: this.anims.generateFrameNumbers("background"),
            frameRate: 15,
            repeat: -1
        });
        this.background = this.add.sprite(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.play('background_anim');

        playButton.setInteractive();

        playButton.on("pointerover", () => {
            console.log('hover');
            playButton.pos
            playButton.setScale(1.5);
            playButton.x = 350;
            playButton.y = 290;
        });

        playButton.on("pointerout", () => {
            console.log('not hovering');
            playButton.setScale(1);
            playButton.x = 365;
            playButton.y = 300;
        });

        playButton.on("pointerup", () => {
            console.log('play');
            this.scene.start("bootGame");
        });
    }
}
