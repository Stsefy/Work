"use strict";
document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);

let gameStarted = false;
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 400;

let leftScore = 0;
let rightScore = 0;
let ballX = FIELD_WIDTH / 2;
let ballY = FIELD_HEIGHT / 2;

let ballH = {
  posX: ballX,
  posY: ballY,
  speedX: 2,
  speedY: 1,
  width: 20,
  height: 20,

  update: function () {
    const ballElem = document.getElementById("ball");
    ballElem.style.left = this.posX + "px";
    ballElem.style.top = this.posY + "px";
  },
};

let areaH = {
  width: 800,
  height: 400,
};

function start() {
  if (!gameStarted) {
    // Запускаем игру, только если она не началась
    gameStarted = true;
    setInterval(tick, 40);
  }
}
let dx = getRandomDirection();
let dy = getRandomDirection();
function getRandom() {
  return Math.random() * (1 - 0.8) + 0.8;
}
function getRandomDirection() {
  if (Boolean(Math.round(Math.random()))) {
    return getRandom();
    // Если Boolean() вернул true, возвращаем случайное число
    // в нужном нам диапазоне функцией getRandom()
  } else {
    return -getRandom();
  }
  // Если Boolean() вернул false, то возвращаем тоже самое,
  // но со знаком "минус"
}

function tick() {
  ballH.posX += dx;
  ballH.posY += dy;

  checkCollision();

  // вылетел ли мяч ниже пола?
  if (ballH.posY + ballH.height >= areaH.height) {
    dy = -dy * 1.2;
    //ballH.posY = areaH.height - ballH.height;
  }
  // вылетел ли мяч выше потолка?
  if (ballH.posY < 0) {
    dy = -dy * 1.2;
    //ballH.posY -= dy;
  }

  ballH.update();

  rightRacket.y += rightRacket.speed;
  rightRacket.update();

  leftRacket.y += leftRacket.speed;
  leftRacket.update();
}

ballH.update();

let rightRacket = {
  speed: 0,
  y: FIELD_HEIGHT / 2,

  update: function () {
    const rightRacketElem = document.getElementById("paddle-right");
    rightRacketElem.style.top = this.y + "px";
  },
};
let leftRacket = {
  speed: 0,
  y: FIELD_HEIGHT / 2,

  update: function () {
    const leftRacketElem = document.getElementById("paddle-left");
    leftRacketElem.style.top = this.y + "px";
  },
};

function keydown(eo) {
  console.log(eo.keyCode);
  if (eo.keyCode === 40) {
    rightRacket.speed = 2;
    rightRacket.update();
  }
  if (eo.keyCode === 38) {
    rightRacket.speed = -2;
    rightRacket.update();
  }
  if (eo.keyCode === 16) {
    // Shift
    leftRacket.speed = 2;
    leftRacket.update();
  }
  if (eo.keyCode === 17) {
    // Ctrl
    leftRacket.speed = -2;
    leftRacket.update();
  }
}
function keyup(eo) {
  eo.preventDefault();
  if (eo.keyCode === 40 || eo.keyCode === 38) {
    rightRacket.speed = 0;
    rightRacket.update();
  }
  if (eo.keyCode === 16 || eo.keyCode === 17) {
    leftRacket.speed = 0;
    leftRacket.update();
  }
}

function checkCollision() {
  const ballBottom = ballH.posY + ballH.height;
  const ballRight = ballH.posX + ballH.width;

  const racketElem = document.getElementById("paddle-right");
  const racketHeight = parseInt(getComputedStyle(racketElem).height);
  const racketWidth = parseInt(getComputedStyle(racketElem).width);

  // Предположим, что ракетка справа
  const racketX = FIELD_WIDTH - racketWidth;
  const racketY = rightRacket.y;

  // Проверка на столкновение
  if (
    ballRight >= racketX &&
    ballH.posX <= racketX + racketWidth &&
    ballBottom >= racketY &&
    ballH.posY <= racketY + racketHeight
  ) {
    dx = -dx; // меняем направление мяча
  }
  if (ballRight >= FIELD_WIDTH || ballH.posX <= 0) {
    // Мяч коснулся левой или правой стены
    if (ballRight >= FIELD_WIDTH) {
      // Мяч коснулся правой стены
      leftScore++; // Увеличиваем счет левого игрока
      updateScore();
      ballH.posX = areaH.width - ballH.width;
      dy = 0;
      gameStarted = false;
    } else if (ballH.posX <= 0) {
      // Мяч коснулся левой стены
      rightScore++;
      gameStarted = false;
      // Увеличиваем счет правого игрока
      updateScore();
      ballH.posX = 0; // Устанавливаем мяч на левую стену
      // Останавливаем мяч
      dy = 0;
    }
  }
}
function updateScore() {
  const leftScoreElement = document.getElementById("left-score");
  const rightScoreElement = document.getElementById("right-score");
  leftScoreElement.textContent = leftScore;
  rightScoreElement.textContent = rightScore;
}
