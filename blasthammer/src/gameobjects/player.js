import Particle from "./particle";
import Hammer from "./hammer";

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship1_1");
    this.scene = scene;
    this.setOrigin(0.5);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setCircle(26);
    this.body.setOffset(6, 9);
    this.body.setBounce(0.8);
    this.angle = 0;
    this.init();
  }

  init() {
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.body.setDrag(300);
    this.body.setAngularDrag(400);
    this.body.setMaxVelocity(600);
  }

  update(timestep, delta) {
    if (this.cursor.left.isDown) {
      this.body.setAngularVelocity(-150);
    } else if (this.cursor.right.isDown) {
      this.body.setAngularVelocity(150);
    } else {
      this.body.setAngularVelocity(0);
    }

    if (this.cursor.up.isDown) {
      this.body.setVelocity(
        Math.cos(this.rotation) * 300,
        Math.sin(this.rotation) * 300
      );
    } else {
      this.body.setAcceleration(0);
    }

    if (Phaser.Math.Between(1, 4) > 1) {
      this.scene.add.existing(
        new Particle(this.scene, this.x, this.y, 0xffffff, 10)
      );
    }
  }

  hammer(hammers) {
    new Hammer(this.scene, this.x, this.y, this.rotation);
  }
}

export default Player;
