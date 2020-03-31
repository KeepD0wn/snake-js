$(document).ready(function(){
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');

	const ground = new Image();
	ground.src ="black.jpg";

	const foodImg = new Image();
	foodImg.src ="apple.png";

	let box =32;
	let score =0;
	let food = {
		x: Math.floor((Math.random()*21))*box,
		y: Math.floor((Math.random()*13+3))*box
	};

	let snake = [];
	snake[0]= {
		x: 10*box,
		y: 8*box
	};

	document.addEventListener("keydown", Direction);

	let dir;

	function Direction(event){
		if(event.keyCode==37 && dir!="right")
			dir="left";
		else if(event.keyCode==38 && dir!="down")
			dir="up";
		else if(event.keyCode==39 && dir!="left")
			dir="right";
		else if(event.keyCode==40 && dir!="up")
			dir="down";
	}

	function eatTail(head,arr){
		for(let i=0;i<arr.length;i++){
			if(head.x == arr[i].x && head.y == arr[i].y)
			{
				clearInterval(game);
			}
		}
	}

	function DrawGame(){
		ctx.drawImage(ground,0,0);

		ctx.drawImage(foodImg,food.x,food.y);

		for(let i =0; i<snake.length;i++){
			ctx.fillStyle = i==0? "red": "green";
			ctx.fillRect(snake[i].x, snake[i].y,box,box);
		}

		ctx.fillStyle="white";
		ctx.font ="50px Arial";
		ctx.fillText(score, 0, box*1.4);

		let snakeX= snake[0].x;
		let snakeY= snake[0].y;

		if(snakeX == food.x && snakeY == food.y){
			score+=1;

			food = {
				x: Math.floor((Math.random()*17))*box,
				y: Math.floor((Math.random()*15))*box
			};
		}
		else{
			snake.pop();
		}

		if(dir == "left")
			snakeX-=box;
		if(dir == "right")
			snakeX+=box;
		if(dir == "up")
			snakeY-=box;
		if(dir == "down")
			snakeY+=box;

		let newHead = {
			x: snakeX,
			y: snakeY
		};

		eatTail(newHead,snake);

		snake.unshift(newHead);
	}

	let game = setInterval(DrawGame,100);
});

