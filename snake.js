


function init(){
	canvas = document.getElementById('mycanvas');
	W = canvas.width =  990;
	H = canvas.height = 660;
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
	score = 3;


	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";
	face = new Image();
	face.src = "Assets/face.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:3,
		color:"red",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(let i=this.init_len; i>0; i--){
				this.cells.push({x:i, y:0});
			}
		},
		drawSnake:function(){

			for(let i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.shadowBlur = 20;
				pen.shadowColor = "black";
				if(i==0){
					pen.drawImage(face,this.cells[i].x*cs, this.cells[i].y*cs, cs, cs);
				}else{
					pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-3, cs-3);
				}
			}
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x * (cs+1) > W || this.cells[0].y * (cs+1) > H ){
				game_over = true;
			}

			for(let i=1; i<this.cells.length; i++){
				if(this.cells[i].x == this.cells[0].x && this.cells[i].y == this.cells[0].y ){
					game_over = true;
				}
			}

		}
	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statements
		if(e.key=="ArrowRight"){
			if(snake.direction != "left") snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			if(snake.direction != "right")snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			if(snake.direction != "up") snake.direction = "down";
		}
		else{
			if(snake.direction != "down") snake.direction = "up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.shadowBlur = 20;
	pen.shadowColor = "black";
	pen.drawImage(food_img,food.x* cs,food.y*cs, cs, cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "black";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameLoop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();

var f = setInterval(gameLoop,100);











