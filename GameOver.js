class Preload extends Phaser.Scene {
  constructor() {
      super({key: "GameOver"});
  }

  Preload(){
    this.load.image('Lava', 'assets/images/Lava.png');
    
  }
}