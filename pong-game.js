const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";

const ballRadius = 12.5;
const paddleSpeed = 50;

let intervalId;
let ballSpeed = 1;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;

let ballDirectionX = 0;
let ballDirectionY = 0;

let playerScore1 = 0;
let playerScore2 = 0;

let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0
};

let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}

function nextTick() {
  intervalId = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballDirectionX = 1;
  } else {
    ballDirectionX = -1;
  }

  if (Math.round(Math.random()) == 1) {
    ballDirectionY = 1;
  } else {
    ballDirectionY = -1;
  }

  ballX = gameWidth / 2;
  ballY = gameHeight /2;

  drawBall(ballX, ballY);
}

function moveBall() {
  ballX += (ballSpeed * ballDirectionX);
  ballY += (ballSpeed * ballDirectionY);
}

function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballDirectionY *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    ballDirectionY *= -1;
  }
  if (ballX <= 0) {
    playerScore2++;
    updateScore();
    createBall();
    return;
  }

  if (ballX >= gameWidth) {
    playerScore1++;
    updateScore();
    createBall();
    return;
  }

  if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = (paddle1.x + paddle1.width) + ballRadius;
      ballDirectionX *= -1;
      ballSpeed += 1;
    }
  }

  if (ballX >= (paddle2.x - ballRadius)) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;
      ballDirectionX *= -1;
      ballSpeed += 1;
    }
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  const paddle1Up = 87; // W key
  const paddle1Down = 83; // S key

  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) {
        paddle1.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddle2.y > 0) {
        paddle2.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) {
        paddle2.y += paddleSpeed;
      }
      break;
    default:
      break;
  }
}

function updateScore() {
  scoreText.textContent = `${playerScore1} : ${playerScore2}`;
}
function resetGame() {
  playerScore1 = 0;
  playerScore2 = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };

  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
  };
}
