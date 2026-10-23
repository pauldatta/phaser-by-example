import Phaser from "phaser";
import Bootloader from "./scenes/Bootloader";
import Game from "./scenes/Game";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 1024,
  height: 768,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Bootloader, Game],
};

new Phaser.Game(config);
