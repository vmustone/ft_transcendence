document.addEventListener('DOMContentLoaded', function() {
    console.log('Pong Game Home Page Loaded');

    let intervalId;
    let speedIncreaseIntervalId;
    let isBallMoving = false;

    document.getElementById('startGame').addEventListener('click', function() {
        console.log('Play Now button clicked');
        const canvas = document.getElementById('pongCanvas');

        // Request full screen
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }

        canvas.style.display = 'block'; // Make sure canvas is visible
        adjustCanvasSize();
		resetPongGame();
        startPongGameWithDelay();
    });

    // Handle full-screen change event
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    function handleFullScreenChange() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement &&
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            console.log('Exited full screen');
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (speedIncreaseIntervalId) {
                clearInterval(speedIncreaseIntervalId);
            }
            document.getElementById('pongCanvas').style.display = 'none';
        }
    }

	function adjustCanvasSize() {
        const canvas = document.getElementById('pongCanvas');
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const aspectRatio = 16 / 9;
        let width, height;

        if (screenWidth / screenHeight > aspectRatio) {
            // Screen is wider than 16:9, so we base the dimensions on the height
            height = screenHeight;
            width = height * aspectRatio;
        } else {
            // Screen is taller or exactly 16:9, so we base the dimensions on the width
            width = screenWidth;
            height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        canvas.style.marginLeft = `${(screenWidth - width) / 2}px`;
        canvas.style.marginTop = `${(screenHeight - height) / 2}px`;
    }

    function resetPongGame() {
        if (intervalId) {
            clearInterval(intervalId);
        }

        const canvas = document.getElementById('pongCanvas');
        const context = canvas.getContext('2d');

        // Ball properties
        window.initialDx = 2;
        window.initialDy = 2;
        window.x = canvas.width / 2;
        window.y = canvas.height / 2;
        window.dx = initialDx;
        window.dy = initialDy;
        window.ballRadius = 10;

        // Paddle properties
        window.paddleHeight = 75;
        window.paddleWidth = 10;
        window.paddleSpeed = 7;

        // Player paddles
        window.paddle1 = { x: 0, y: (canvas.height - paddleHeight) / 2 };
        window.paddle2 = { x: canvas.width - paddleWidth, y: (canvas.height - paddleHeight) / 2 };

        // Paddle movement flags
        window.upPressed1 = false;
        window.downPressed1 = false;
        window.upPressed2 = false;
        window.downPressed2 = false;

        // Scores
        window.score1 = 0;
        window.score2 = 0;

        // Speed increase interval (every 10 seconds)
        window.speedMultiplier = 1.1; // Increase speed by 10% every interval
        isBallMoving = false;
    }

	// Reset ball position and speed after scoring
	function resetBallWithDelay() {
		const canvas = document.getElementById('pongCanvas');
		x = canvas.width / 2;
		y = canvas.height / 2;
		dx = 0;
		dy = 0;
		setTimeout(() => {
			dx = initialDx;
			dy = initialDy;
			isBallMoving = true;
		}, 1000); // 1 seconds delay
	}

    function startPongGame() {
        console.log('Starting Pong Game');
        const canvas = document.getElementById('pongCanvas');
        const context = canvas.getContext('2d');

        // Increase ball speed
        function increaseSpeed() {
            dx *= speedMultiplier;
            dy *= speedMultiplier;
        }

        // Start speed increase interval
        setInterval(increaseSpeed, 5000); // 10 seconds

        // Draw ball
        function drawBall() {
            context.beginPath();
            context.arc(x, y, ballRadius, 0, Math.PI * 2);
            context.fillStyle = "#0095DD";
            context.fill();
            context.closePath();
        }

        // Draw paddles
        function drawPaddle(paddle) {
            context.beginPath();
            context.rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
            context.fillStyle = "#0095DD";
            context.fill();
            context.closePath();
        }

        // Draw scores
        function drawScores() {
            context.font = "16px Arial";
            context.fillStyle = "#0095DD";
            context.fillText("Player 1: " + score1, 20, 20);
            context.fillText("Player 2: " + score2, canvas.width - 100, 20);
        }

        // Handle paddle movement
        function movePaddles() {
            if (upPressed1 && paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            if (downPressed1 && paddle1.y < canvas.height - paddleHeight) {
                paddle1.y += paddleSpeed;
            }
            if (upPressed2 && paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            if (downPressed2 && paddle2.y < canvas.height - paddleHeight) {
                paddle2.y += paddleSpeed;
            }
        }

        // Detect collision with paddles
        function detectCollision() {
            // Left paddle
            if (x - ballRadius < paddle1.x + paddleWidth && y > paddle1.y && y < paddle1.y + paddleHeight) {
                dx = -dx;
            }
            // Right paddle
            if (x + ballRadius > paddle2.x && y > paddle2.y && y < paddle2.y + paddleHeight) {
                dx = -dx;
            }
        }

        // Update scores if ball misses paddles
        function updateScores() {
            if (x - ballRadius < 0) {
                score2++;
                resetBallWithDelay();
            } else if (x + ballRadius > canvas.width) {
                score1++;
                resetBallWithDelay();
            }
        }

        // Draw everything
        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle(paddle1);
            drawPaddle(paddle2);
            drawScores();
            movePaddles();
            detectCollision();
            updateScores();

            // Ball movement
            if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
                dy = -dy;
            }

            x += dx;
            y += dy;
        }

        // Keyboard event listeners
        document.addEventListener('keydown', function(event) {
            if (event.key == 'w' || event.key == 'W') {
                upPressed1 = true;
            }
            if (event.key == 's' || event.key == 'S') {
                downPressed1 = true;
            }
            if (event.key == 'i' || event.key == 'I') {
                upPressed2 = true;
            }
            if (event.key == 'k' || event.key == 'K') {
                downPressed2 = true;
            }
        });

        document.addEventListener('keyup', function(event) {
            if (event.key == 'w' || event.key == 'W') {
                upPressed1 = false;
            }
            if (event.key == 's' || event.key == 'S') {
                downPressed1 = false;
            }
            if (event.key == 'i' || event.key == 'I') {
                upPressed2 = false;
            }
            if (event.key == 'k' || event.key == 'K') {
                downPressed2 = false;
            }
        });

        intervalId = setInterval(draw, 10);
    }

    function startPongGameWithDelay() {
        resetBallWithDelay();
        startPongGame();
    }
});