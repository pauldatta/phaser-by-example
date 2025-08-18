import Player from "../gameobjects/player";
import Wall from "../gameobjects/wall";
import Hammer from "../gameobjects/hammer";
import Explosion from "../gameobjects/explosion";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  create() {
    this.player = new Player(this, 400, 300);
    this.walls = this.physics.add.staticGroup();
    this.hammers = this.physics.add.group({ classType: Hammer });

    this.createWalls();
    this.addColliders();

    this.input.on("pointerdown", (pointer) => {
      if (pointer.rightButtonDown()) {
        this.player.hammer(this.hammers);
      }
    });
     this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 0, 100);
     this.cameras.main.setBackgroundColor(0xcccccc);
  }

  createWalls() {
    for (let i = 0; i < 10; i++) {
      this.walls.add(new Wall(this, 100 + i * 64, 100));
      this.walls.add(new Wall(this, 100 + i * 64, 500));
    }

    for (let i = 0; i < 5; i++) {
        this.walls.add(new Wall(this, 100, 164 + i * 64));
        this.walls.add(new Wall(this, 724, 164 + i * 64));
      }
  }

  addColliders() {
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.hammers, this.walls, (hammer, wall) => {
        new Explosion(this, wall.x, wall.y);
        wall.destroy();
        hammer.destroy();
    });
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
