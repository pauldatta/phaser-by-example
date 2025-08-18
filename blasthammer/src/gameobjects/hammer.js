class Hammer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, rotation) {
    super(scene, x, y, "shot");
    this.scene = scene;
    this.setOrigin(0.5);
    this.rotation = rotation;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setVelocity(
      Math.cos(this.rotation) * 300,
      Math.sin(this.rotation) * 300
    );

    this.scene.time.delayedCall(500, () => this.destroy());
  }
}

export default Hammer;
