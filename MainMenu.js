class MainMenu extends Phaser.Scene {
    constructor () {
        super({key: 'MainMenu'});
    }

    preload() {
        //background spritesheet
        this.load.spritesheet('background', 'assets/spritesheets/mainmenu.png', {
            frameWidth: 810,
            frameHeight: 600
        });
        //title image
        this.load.image('title', 'assets/images/title.png');
        //play button image
        this.load.image('playButton', 'assets/images/playButton.png');
    }

    create() {
        //adding title image to canvas and setting it to the highest layer with depth
        this.add.image(0, 0, "title").setOrigin(0).setDepth(1);
        //adding play button image to canvas and setting it to the 2nd highest layer with depth
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

        //sets the play button image to interactive 
        playButton.setInteractive();

        //detects if player is hovering over play button
        playButton.on("pointerover", () => {
            console.log('hover');
            playButton.pos
            playButton.setScale(1.5);
            playButton.x = 350;
            playButton.y = 290;
        });

        //detects if player is not hovering over play button
        playButton.on("pointerout", () => {
            console.log('not hovering');
            playButton.setScale(1);
            playButton.x = 365;
            playButton.y = 300;
        });

        //detects if player clicks play button
        playButton.on("pointerup", () => {
            this.scene.start("bootGame");
        });
    }
}
