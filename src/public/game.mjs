import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

const loadImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

const mainPlayerArt = loadImage(
  "https://cdn.freecodecamp.org/demo-projects/images/main-player.png"
);
const goldCoinArt = loadImage(
  "https://cdn.freecodecamp.org/demo-projects/images/gold-coin.png"
);

socket.on("new game", (obj, coin, users) => {
  let player = new Player({
    x: obj.x,
    y: obj.y,
    score: obj.score,
    id: obj.id,
  });

  let collectible = new Collectible({
    x: coin.x,
    y: coin.y,
    value: coin.value,
    id: coin.id,
  });

  player.draw(canvas, context, collectible, mainPlayerArt, users, goldCoinArt);

  document.addEventListener("keydown", (event) => {
    let key = event.key.toUpperCase();

    if (key == "W" || key == "A" || key == "S" || key == "D") {
      socket.emit("movement", { key });
      player.movePlayer(key, 10);
    }
  });
  socket.on("newPosition", (obj, users) => {
    player.x = obj.x;
    player.y = obj.y;

    player.draw(
      canvas,
      context,
      collectible,
      mainPlayerArt,
      users,
      goldCoinArt
    );
  });

  socket.on("new round", (score, coin, users) => {
    player.score = score;
    player.calculateRank(users);

    collectible = new Collectible({
      x: coin.x,
      y: coin.y,
      value: coin.value,
      id: coin.id,
    });
    player.draw(
      canvas,
      context,
      collectible,
      mainPlayerArt,
      users,
      goldCoinArt
    );
  });
});
