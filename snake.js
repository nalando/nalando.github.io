const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;
let score = 0;
const gameButton = document.getElementById('buttonStart');
const MAP_WIDTH = canvas.width / BLOCK_SIZE;
const MAP_HEIGHT = canvas.height / BLOCK_SIZE;


let snake, apple, gameInterval;

function startGame() {
    snake = {
        body: [{ x: Math.floor(MAP_SIZE / 2), y: Math.floor(MAP_SIZE / 2) }],
        size: 5,
        direction: { x: 0, y: -1 },

        drawSnake: function () {
            this.moveSnake();
            ctx.fillStyle = 'lime';
            for (let i = 0; i < this.body.length; i++) {
                ctx.fillRect(
                    this.body[i].x * BLOCK_SIZE,
                    this.body[i].y * BLOCK_SIZE,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );
            }
        },

        moveSnake: function () {
            let newBlock = {
                x: this.body[0].x + this.direction.x,
                y: this.body[0].y + this.direction.y
            };
            this.body.unshift(newBlock);
            while (this.body.length > this.size) {
                this.body.pop();
            }
        },
    };

    apple = {
        x: 5,
        y: 5,
        drawApple: function () {
            ctx.fillStyle = 'red';
            ctx.fillRect(
                this.x * BLOCK_SIZE,
                this.y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        },
        putApple: function () {
            let validPosition = false;
            while (!validPosition) {
                this.x = Math.floor(Math.random() * MAP_WIDTH);
                this.y = Math.floor(Math.random() * MAP_HEIGHT);


                validPosition = !snake.body.some(block => block.x === this.x && block.y === this.y);
            }
        },
    };

    gameInterval = setInterval(drawGame, 100);
}

function keyDown(event) {
    switch (event.keyCode) {
        case 38: case 87: // Up or W
            if (snake.direction.y !== 1) snake.direction = { x: 0, y: -1 };
            break;
        case 40: case 83: // Down or S
            if (snake.direction.y !== -1) snake.direction = { x: 0, y: 1 };
            break;
        case 37: case 65: // Left or A
            if (snake.direction.x !== 1) snake.direction = { x: -1, y: 0 };
            break;
        case 39: case 68: // Right or D
            if (snake.direction.x !== -1) snake.direction = { x: 1, y: 0 };
            break;
    }
}

function drawMap() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function eatApple() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        score++;
        apple.putApple();
        snake.size++;
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, canvas.width - 100, 20);
}

function checkDeath() {
    let head = snake.body[0];
    if (head.x < 0 || head.x >= MAP_WIDTH || head.y < 0 || head.y >= MAP_HEIGHT) {

        clearInterval(gameInterval);
        alert('Game Over!');
    }

    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            clearInterval(gameInterval);
            alert('Game Over!');
        }
    }
}

function drawGame() {
    drawMap();
    apple.drawApple();
    snake.drawSnake();
    eatApple();
    drawScore();
    checkDeath();
}

gameButton.addEventListener('click', startGame);
document.addEventListener('keydown', keyDown);
