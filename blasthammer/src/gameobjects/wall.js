class Wall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "wall");
    this.scene = scene;
    this.setOrigin(0.5);
    scene.add.existing(this);
  }
}

export default Wall;
