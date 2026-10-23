export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  create() {
    this.createTrackTexture();
    this.createCarTexture();
    this.createTreeTexture();
    this.createCheckpointTexture();

    this.track = this.add.image(600, 450, "track-texture");
    this.car = this.physics.add.sprite(600, 700, "car-texture").setScale(0.8);
    this.car.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.car, true);
    this.cameras.main.setBackgroundColor(0xcccccc);

    // Car physics properties
    this.car.setDamping(true);
    this.car.setDrag(0.95);
    this.car.setMaxVelocity(300);
    this.acceleration = 200;
    this.rotationSpeed = 0.1;

    // Add trees
    this.trees = this.physics.add.staticGroup();
    this.trees.create(150, 100, "tree-texture");
    this.trees.create(1050, 100, "tree-texture");
    this.trees.create(150, 800, "tree-texture");
    this.trees.create(1050, 800, "tree-texture");
    this.trees.create(600, 50, "tree-texture");
    this.trees.create(600, 850, "tree-texture");

    this.physics.add.collider(this.car, this.trees, () => {
        this.car.setBounce(0.2);
    });

    // Add checkpoints
    this.checkpoints = this.physics.add.staticGroup();
    this.checkpoints.create(600, 200, "checkpoint-texture");
    this.checkpoints.create(1000, 450, "checkpoint-texture");
    this.checkpoints.create(600, 700, "checkpoint-texture");
    this.checkpoints.create(200, 450, "checkpoint-texture");

    this.physics.add.overlap(this.car, this.checkpoints, this.checkpointPassed, null, this);

    this.laps = 0;
    this.currentCheckpoint = 0;

    this.lapText = this.add.text(10, 10, "Laps: 0", { font: "32px Arial", fill: "#ffffff" }).setScrollFactor(0);
    this.timerText = this.add.text(10, 50, "Time: 0", { font: "32px Arial", fill: "#ffffff" }).setScrollFactor(0);

    this.startTime = this.time.now;
  }



  createCheckpointTexture() {
    const graphics = this.make.graphics({ width: 200, height: 20 });
    graphics.fillStyle(0xffff00, 0.5);
    graphics.fillRect(0, 0, 200, 20);
    graphics.generateTexture("checkpoint-texture", 200, 20);
    graphics.destroy();
  }

  checkpointPassed(car, checkpoint) {
    const checkpointIndex = this.checkpoints.children.entries.indexOf(checkpoint);
    if (checkpointIndex === this.currentCheckpoint) {
      this.currentCheckpoint++;
      if (this.currentCheckpoint === this.checkpoints.children.entries.length) {
        this.currentCheckpoint = 0;
        this.laps++;
        this.lapText.setText(`Laps: ${this.laps}`);
        console.log(`Lap ${this.laps} completed!`);
      }
    }
  }

  createTreeTexture() {
    const graphics = this.make.graphics({ width: 64, height: 96 });
    graphics.fillStyle(0x8b4513); // Brown for the trunk
    graphics.fillRect(24, 64, 16, 32);
    graphics.fillStyle(0x008000); // Green for the leaves
    graphics.fillTriangle(32, 0, 0, 64, 64, 64);
    graphics.generateTexture("tree-texture", 64, 96);
    graphics.destroy();
  }

  createCarTexture() {
    const graphics = this.make.graphics({ width: 40, height: 80 });
    graphics.fillStyle(0x0000ff); // Blue color for the car body
    graphics.fillRect(0, 0, 40, 80); // Main body of the car

    graphics.fillStyle(0xadd8e6); // Lighter blue for the cabin
    graphics.fillRect(5, 10, 30, 50); // Cabin

    graphics.fillStyle(0xffffff); // White color for highlights
    graphics.fillRect(5, 15, 5, 10); // Left headlight
    graphics.fillRect(30, 15, 5, 10); // Right headlight
    graphics.generateTexture("car-texture", 40, 80);
    graphics.destroy();
  }

  createTrackTexture() {
    const graphics = this.make.graphics({ width: 1200, height: 900 });
    graphics.fillStyle(0x6b8e23); // Green grass
    graphics.fillRect(0, 0, 1200, 900);

    const path = new Phaser.Curves.Path();
    path.add(new Phaser.Curves.Ellipse(600, 450, 400, 250));
    
    graphics.lineStyle(40, 0x808080); // Gray track
    path.draw(graphics);

    graphics.lineStyle(2, 0xffffff); // White lines
    path.draw(graphics);

    graphics.fillStyle(0xffffff);
    graphics.fillRect(550, 680, 100, 20); // Starting line

    graphics.generateTexture("track-texture", 1200, 900);
    graphics.destroy();
  }

  update(time, delta) {
    const elapsedTime = (this.time.now - this.startTime) / 1000;
    this.timerText.setText(`Time: ${elapsedTime.toFixed(2)}`);

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.car.rotation - Math.PI / 2, this.acceleration, this.car.body.acceleration);
    } else if (this.cursors.down.isDown) {
        this.physics.velocityFromRotation(this.car.rotation - Math.PI / 2, -this.acceleration, this.car.body.acceleration);
    } else {
      this.car.setAcceleration(0);
    }

    const speed = this.car.body.velocity.length();
    if (this.cursors.left.isDown && speed > 10) {
      this.car.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown && speed > 10) {
      this.car.setAngularVelocity(150);
    } else {
      this.car.setAngularVelocity(0);
    }
  }
}