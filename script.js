score = 0;
cross = true;
audio = new Audio('music.mp3');   // for normal audio during the game
audiogo = new Audio('gameover.mp3');   //for game over

setTimeout(()=>{
	audio.play();
},1000)

document.onkeydown = function(e){
	if(e.keyCode == 38){
		dino = document.querySelector('.dino');
		dino.classList.add('animateDino');
		setTimeout(() => {
			dino.classList.remove('animateDino');
		},700);
	}
	 else if(e.keyCode == 39){      // right
	 	dino = document.querySelector('.dino');
	 	dinoX =  parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
	 	dino.style.left = dinoX + 54 + "px"; 
	 }
	 else if(e.keyCode == 37){      // left
	 	dino = document.querySelector('.dino');
	 	dinoX =  parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
	 	dino.style.left = dinoX - 54 + "px"; 
	 }
}
setInterval(() => {
		dino = document.querySelector('.dino');
		gameOver1 = document.querySelector('.gameOver1');
		gameOver2 = document.querySelector('.gameOver2');
		obstacle = document.querySelector('.obstacle');

		dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
		dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

		ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
		oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

		offsetX = Math.abs(dx-ox);
		offsetY = Math.abs(dy-oy);

		if(offsetX < 56 && offsetY < 56){
			gameOver1.style.visibility= 'visible';
			gameOver2.style.visibility= 'visible';
			obstacle.classList.remove('animateObs');
			finalScore(score);
			audiogo.play();
			setTimeout(()=>{
				audiogo.pause();
				audio.pause();
			},1000)
			document.onclick = function(){
				location.reload();
			}
		}else if(offsetX < 123 && cross){
			score+=1;
			updateScore(score);
				cross = false;
			setTimeout(() => {
				cross = true;
},1000);
			setTimeout(() =>{
			aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
			newDur = aniDur - 0.1;
			obstacle.style.animationDuration = newDur + 's';
			},500);
}
},10);
function updateScore(score){
	scoreCont.innerHTML = "Your score : "+ score;
}
function finalScore(score){
	scoreCont.style.visibility= 'hidden';
	dino = document.querySelector('.dino');
	delete dino.visibility;
	gameOver2.innerHTML = "Your score : "+ (score-1);
}