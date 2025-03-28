const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const buttonStart = document.getElementById("buttonStart");
const BLOCK_SIZE = 20;  //放大畫素，20點為一格
const MAP_SIZE = canvas.width/BLOCK_SIZE ; // (寬400 / 格20) = 20格子(列)
let score1 = 0;     // 紀錄分數
let score2 = 0;     // 紀錄分數
playerKey1 = [38,40,37,39];     //按鍵配製1 上下左右
playerKey2 = [87,83,65,68];     //按鍵配製2 wsad

class Snake{
    //蛇蛇建構子
    constructor(startX, startY, snakeColor, playerKey) {
        this.body = [{ x: startX, y: startY }];
        this.size = 5;
        this.score = 0;
        this.color = snakeColor;
        this.direction = { x: 0, y: -1 };
        this.playerKey = playerKey;
    }
    eatApple() {
        for (let i = 0; i < apple.apples.length; i++) {
            if (
                this.body[0].x === apple.apples[i].x &&
                this.body[0].y === apple.apples[i].y
            ) {
                apple.apples.splice(i, 1);
                this.size++;
                this.score++;
            }
        }
    }

    moveSnake() {
        let newBlock = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newBlock);
        while (this.body.length > this.size) {
            this.body.pop();
        }
        this.checkDeath();
    }

    drawSnake() {
        this.moveSnake();
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(
                this.body[i].x * BLOCK_SIZE,
                this.body[i].y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
        this.eatApple();
    }
    

}