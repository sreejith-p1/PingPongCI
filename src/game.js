const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Game settings
const paddleWidth = 12, paddleHeight = 90;
const ballRadius = 10;
const playerX = 15;
const aiX = canvas.width - paddleWidth - 15;

// Paddle objects
let player = { x: playerX, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, score: 0 };
let ai = { x: aiX, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, score: 0 };

// Ball object
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 5 * (Math.random() > 0.5 ? 1 : -1),
    vy: 4 * (Math.random() > 0.5 ? 1 : -1),
    radius: ballRadius
};

// Mouse control for player paddle
canvas.addEventListener("mousemove", (evt) => {
    const rect = canvas.getBoundingClientRect();
    let mouseY = evt.clientY - rect.top;
    player.y = mouseY - paddleHeight / 2;
    if (player.y < 0) player.y = 0;
    if (player.y + paddleHeight > canvas.height) player.y = canvas.height - paddleHeight;
});

// Drawing functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    ctx.fillStyle = "#666";
    for (let i = 0; i < canvas.height; i += 30) {
        ctx.fillRect(canvas.width/2 - 1, i, 2, 15);
    }
}

function drawScore() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(player.score, canvas.width/4, 40);
    ctx.fillText(ai.score, 3*canvas.width/4, 40);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Collision detection
function collision(b, p) {
    return (
        b.x - b.radius < p.x + p.width &&
        b.x + b.radius > p.x &&
        b.y - b.radius < p.y + p.height &&
        b.y + b.radius > p.y
    );
}

// AI movement
function moveAI() {
    const target = ball.y - ai.height / 2;
    let speed = 0.08; // AI reaction speed
    ai.y += (target - ai.y) * speed;
    // Clamp AI paddle position
    if (ai.y < 0) ai.y = 0;
    if (ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
}

// Game update loop
function update() {
    // Move ball
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.vy = -ball.vy;
    }

    // Score check
    if (ball.x - ball.radius < 0) {
        ai.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }

    // Paddle collision
    let currentPaddle = ball.x < canvas.width / 2 ? player : ai;
    if (collision(ball, currentPaddle)) {
        // Calculate angle
        let collidePoint = (ball.y - (currentPaddle.y + currentPaddle.height / 2));
        collidePoint = collidePoint / (currentPaddle.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = ball.x < canvas.width / 2 ? 1 : -1;
        let speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 1.05;
        ball.vx = direction * speed * Math.cos(angleRad);
        ball.vy = speed * Math.sin(angleRad);
    }

    // AI movement
    moveAI();
}

// Render everything
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#111");
    drawNet();
    drawScore();
    drawRect(player.x, player.y, player.width, player.height, "#09f");
    drawRect(ai.x, ai.y, ai.width, ai.height, "#f33");
    drawCircle(ball.x, ball.y, ball.radius, "#fff");
}

// Game loop
function game() {
    update();
    render();
    requestAnimationFrame(game);
}

game();