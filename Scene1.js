class Scene1 extends Phaser.Scene {
    constructor() {
        super("playGame");

        //Score variable
        this.score = 0;
        this.firing = true;
        
    }

    create() {
        

        //background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "clearMap");
        this.background.setOrigin(0, 0);


        //Creating score text
        this.scoreLabel = this.add.text(20,20,"SCORE:" +this.score,
        {
            font:"15px Arial",
            fill: "black"
        });

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
        
        
    }

    update() {
        this.movePlayerManager();
        this.playerFire();

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

    playerFire(){
        if(this.cursorKeys.space.isDown){
            //Allows firing delay
            if(this.firing){
                //Createing missile
                this.missile = this.physics.add.sprite(this.player.x, this.player.y, "missile");
                this.missile.setScale(.6);
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