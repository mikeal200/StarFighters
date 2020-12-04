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
            fill: "black"
        });
        
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
                
        this.alien2 = this.physics.add.sprite(600, 30, "alien-2");
        this.alien2.play("alien2_anim");
        this.alien2.setScale(.4);
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
                enemy.destroy();
                this.score+=100;
                this.scoreLabel.setText("SCORE: "+this.score);
            }
            ,null,this);

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
        this.moveAlien1(this.alien1, 1);
        this.moveAlien2(this.alien2, 50);
        this.moveAlien3(this.alien3, 100);
        this.movePlayerManager();
        this.playerFire();

        for(var i = 0; i < this.missiles.getChildren().length; i++) {
            var missile = this.missiles.getChildren()[i];
            
            if(missile.y < -50) {
                missile.destroy();
            }
        }
    }

    moveAlien1(alien, speed){
        alien.y += speed;
       if (alien.y > 600 ){
           this.resetAlienPos(alien);
        }
    }

    moveAlien2(alien, speed){
        if (alien.x > 800){
            alien.setVelocityX(-speed);
        }
        if (alien.x < 0){
            alien.setVelocityX(speed);
        }
       }
    moveAlien3(alien, speed){
        if (alien.x > 810){
            alien.y +=10;
            alien.setVelocityX(-speed);
        }
        if (alien.x < -10){
            alien.y +=10;
            alien.setVelocityX(speed);
        }
        if (alien.y > 600){
            this.resetAlienPos(alien);
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
                //Createing missile
                this.missile = this.physics.add.sprite(this.player.x, this.player.y, "missile");
                this.missile.setScale(.05);
                this.missiles.add(this.missile);
                this.missile.setVelocityY(-gameSettings.missileSpeed)
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
}