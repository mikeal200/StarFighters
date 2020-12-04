class GameOver extends Phaser.Scene {
  constructor() {
      super("gameOver");
      this.finalScore;
      this.highScore; 
  }

  preload(){
    this.load.image('Lava', 'assets/images/Lava.png');
    //Game Over Title
    this.load.image('gameOverTitle', 'assets/images/gameOver.png');
    //play button image
    this.load.image('playAgainButton', 'assets/images/playAgainButton.png');

  }

  create() {
        //adding title image to canvas and setting it to the highest layer with depth
        this.add.image(365, 50, "gameOverTitle").setOrigin(0).setDepth(1);
        //adding replay button image to scene
        let playAgainButton = this.add.image(365, 400, 'playAgainButton').setOrigin(0).setDepth(2);

        this.anims.create( {
            key: "background_anim",
            frames: this.anims.generateFrameNumbers("background"),
            frameRate: 15,
            repeat: -1
        });
        this.background = this.add.sprite(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.background.play('background_anim');

        //sets the replay button image to interactive 
        playAgainButton.setInteractive();

        //detects if player is hovering over replay button
        playAgainButton.on("pointerover", () => {
            console.log('hover');
            playAgainButton.pos
            playAgainButton.setScale(1.5);
            playAgainButton.x = 350;
            playAgainButton.y = 390;
        });

        //detects if player is not hovering over replay button
        playAgainButton.on("pointerout", () => {
            console.log('not hovering');
            playAgainButton.setScale(1);
            playAgainButton.x = 365;
            playAgainButton.y = 400;
        });

        //detects if player clicks play button
        playAgainButton.on("pointerup", () => {
            gameSettings.score = 0;
            this.scene.start("bootGame");
        });

        //Displaying scores

        this.highScore = 0
        this.finalScoreLabel = this.add.text(340,250,"Your Score: " + gameSettings.score + "\nHigh Score: " + this.highScore,
        {
            font:"25px Arial",
            fill: "white"
        }).setDepth(1).setStroke("white", 2);
  }
}