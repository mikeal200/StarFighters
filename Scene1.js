var frame = 0;

class Scene1 extends Phaser.Scene {
    constructor() {
        super("playGame");

        //Score variable
        this.score = 0;
        this.firing = true;
    }
    create() {
        //background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, mapName);
        
        //Create score
        this.scoreLabel = this.add.text(20,20,"SCORE:" +this.score,
        {
            font:"15px Arial",
            fill: "white"
            
        }).setDepth(1).setStroke("black", 2.5);

        //shield when enemies blow up at base
        this.shieldText = this.add.text(20,570,"Shield " + gameSettings.playerShield + "/5",
        {
            font:"15px Arial",
            fill: "white"
            
        }).setDepth(1).setStroke("black", 2.5);
        
        //sets origin to 0, 0 top left
        this.background.setOrigin(0, 0);
        this.map = this.add.sprite(0, 0, spriteName);
        this.map.setOrigin(0, 0);
        this.map.setScale(animScale);
        this.map.play(animName);

        if(animSound != null) {
            this.weatherSound = this.sound.add(animSound);
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
            this.weatherSound.play(ambConfig);
        }

        //player life sprites
        this.lifeOne = this.add.sprite(760, 575, "player");
        this.lifeOne.setScale(.4);

        this.lifeTwo = this.add.sprite(720, 575, "player");
        this.lifeTwo.setScale(.4);

        this.lifeThree = this.add.sprite(680, 575, "player");
        this.lifeThree.setScale(.4);

        //player sprite added to canvas
        this.player = this.physics.add.sprite(this.game.config.width / 2 - 50, 600, "player"); 
        this.player.play("player_anim");
        this.player.setScale(.7);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        //enemy sprites added to canvas
        this.enemies = this.physics.add.group();

        this.alien1 = this.physics.add.sprite(400, 30, "alien-1");
        this.alien1.play("alien1_anim");
        this.alien1.setScale(.4);
        this.alien1.flipY= true;
        this.enemies.add(this.alien1);
                
        this.alien2 = this.physics.add.sprite(600, 50, "alien-2");
        this.alien2.play("alien2_anim");
        this.alien2.setScale(.35);
        this.alien2.flipY= true;
        this.enemies.add(this.alien2);
        

        this.alien3 = this.physics.add.sprite(200, 30, "alien-3");
        this.enemies.add(this.alien3);
        this.alien3.play("alien3_anim");
        this.alien3.setScale(.4);
        this.alien3.flipY= true;;
        this.alien3.setVelocityX(100);
        this.alien3.setCollideWorldBounds(true);

        //Missiles group
        this.missiles = this.physics.add.group();

        //Player missile collision
        this.physics.add.overlap(this.missiles, this.enemies, 
            function (missile,enemy){
                missile.destroy();
                var explosionEnemy = new Explosion(this, enemy.x, enemy.y);
                this.explosionSound.play();
                this.resetShipPos(enemy);

                switch(enemy.texture.key) {
                    case "alien-1":
                        this.score+=gameSettings.alien1Score;
                        gameSettings.alien1Speed += .25;
                        break;
                    case "alien-2":
                        this.score+=gameSettings.alien2Score;
                        break;
                    case "alien-3":
                        this.score+=gameSettings.alien3Score;
                        gameSettings.alien3Speed += 1;
                        break;
                }
                this.scoreLabel.setText("SCORE: "+this.score);
            }
            ,null,this);

        //Player-Enemy collision
        this.physics.add.overlap(this.player, this.enemies, this.destroyPlayer, null, this);

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

        //load audio
        this.explosionSound = this.sound.add("explosion");
        this.laserSound = this.sound.add("laser");
    }

    update() {
        if(gameSettings.playerLives == 0) {
            this.scene.start("gameOver");
            //loads gameOver scene and displays high scores and players score
            //get highscores from database - 10 highscores
            //store lowest score in memory
            //if(highscores arent filled, meaning none are 0 because thats what they'll start as)
            ////add.gameSettings.playerScore to array in db or something 
            ////post scores to database
            //else if(playerScore < lowestHighScore)
            ////dont add and break from if statements
            //else
            ////itterate through 10 scores lowest to highest
            ////if(playerScore <= highScoreDB[i])
            //////replace highScoreDB[i - 1] with playerScore 

        }
        frame++;
        this.moveAlien1(this.alien1, gameSettings.alien1Speed);
        this.moveAlien2(this.alien2);
        this.moveAlien3(this.alien3);
        this.movePlayerManager();
        this.checkPlayerShield();
        this.playerFire();
        this.background.tilePositionX -= 0.3;

        for(var i = 0; i < this.missiles.getChildren().length; i++) {
            var missile = this.missiles.getChildren()[i];
            
            if(missile.y < -50) {
                missile.destroy();
            }
        }
    }

    moveAlien1(alien, speed){
        alien.y += speed;
        if (alien.y > 568 ){
            var explosionEnemy = new Explosion(this, alien.x, alien.y);
            this.explosionSound.play();
            gameSettings.playerShield--;
            this.shieldText.setText("Shield " + gameSettings.playerShield + "/5");
            this.resetShipPos(alien);
        }
    }

    moveAlien2(alien){
        if (alien.x > this.game.config.width){
            alien.setVelocityX(gameSettings.alien2Speed = -50);
        }
        else if(alien.x < 0){
            alien.setVelocityX(gameSettings.alien2Speed = 50);
        }
        else {
            alien.setVelocityX(gameSettings.alien2Speed);
        }
    }

    moveAlien3(alien){
        if(frame <= 100) {
            alien.setVelocityX(-gameSettings.alien3Speed);
            alien.setVelocityY(gameSettings.alien3Speed); 
        }
        else if(frame <= 200 && frame > 100) {
            alien.setVelocityX(gameSettings.alien3Speed);
            alien.setVelocityY(gameSettings.alien3Speed);
            if(frame == 200) {
                frame = 0;
            }
        }
        if(alien.y > 568) {
            var explosionEnemy = new Explosion(this, alien.x, alien.y);
            this.explosionSound.play();
            gameSettings.playerShield--;
            this.shieldText.setText("Shield " + gameSettings.playerShield + "/5");
            this.resetShipPos(alien);
        }
    }

    resetAlienPos(alien){
        alien.y= 0;
        var randomX = Phaser.Math.Between(0, 800);
        alien.x = randomX;
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
    }

    playerFire(){
        if(this.cursorKeys.space.isDown){
            //Allows firing delay
            if(this.firing){
                //Creating missile
                this.missile = this.physics.add.sprite(this.player.x, this.player.y, "missile");
                this.missile.setScale(.05);
                this.missiles.add(this.missile);
                this.missile.setVelocityY(-gameSettings.missileSpeed)
                this.laserSound.play();
                //Delay on firing
                this.firing=false;
                this.time.addEvent({
                    delay: gameSettings.firingDelay,
                    callback: ()=>{
                        this.firing=true;
                    }
                });
            }
        }
    }

    alienFire(alien){
        this.laser = this.physics.add.sprite(alien.x, alien.y, "laser");
        this.laser.setScale(.05);
        this.laserSound.add(this.laser);
        this.laser.setVelocityX(gameSettings.missileSpeed);
    }

    resetShipPos(enemy) {
        enemy.y = 0;
        if(enemy.texture.key == "alien-2") {
            enemy.y = 50;
        }
        var randomX = Phaser.Math.Between(0, this.game.config.width);
        enemy.x = randomX;
    }

    resetPlayer() {
        var x = this.game.config.width / 2;
        var y = 100;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;
        var tween = this.tweens.add( {
            targets: this.player,
            y: 600,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function() {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    destroyPlayer(player, enemy) {
        var explosionEnemy = new Explosion(this, enemy.x, enemy.y);
        var explosionPlayer = new Explosion(this, player.x, player.y);
        this.resetShipPos(enemy);
        if(this.player.alpha < 1) {
            return;
        }
        else {
            this.explosionSound.play();
            gameSettings.playerLives--;
            switch(gameSettings.playerLives) {
                case 2:
                    this.lifeThree.destroy();
                    break;
                case 1:
                    this.lifeTwo.destroy();
                    break;
            }
        }
        player.disableBody(true, true);
        this.time.addEvent( {
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false 
        });
    }

    destroyPlayer(player) {
        var explosionPlayer = new Explosion(this, player.x, player.y);

        if(this.player.alpha < 1) {
            return;
        }
        else {
            this.explosionSound.play();
            gameSettings.playerLives--;
            switch(gameSettings.playerLives) {
                case 2:
                    this.lifeThree.destroy();
                    break;
                case 1:
                    this.lifeTwo.destroy();
                    break;
            }
        }
        player.disableBody(true, true);
        this.time.addEvent( {
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false 
        });
    }

    checkPlayerShield() {
        if(gameSettings.playerShield == 0) {
            this.destroyPlayer(this.player);
            gameSettings.playerShield = 5;
            this.shieldText.setText("Shield " + gameSettings.playerShield + "/5");
        }
    }
}