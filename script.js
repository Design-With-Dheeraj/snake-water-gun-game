
document.addEventListener('DOMContentLoaded', ()=>{
	gsap.to('.loader-overlay-contain .mid-line', {
		delay: 0.5,
		width: "100%",
		duration: 5,
		onComplete: gameContain_animate,
	})
})





function gameContain_animate() {
	let activeItemIndicator = CSSRulePlugin.getRule(".play_buttons_main::before");
	let bgFade = CSSRulePlugin.getRule(".inner_container .display-bg-contain::after");
	let tl = gsap.timeline();
	let typeSplit = new SplitType('.game_head')

	tl.to('.loader-overlay-contain .mid-line', {
		opacity:0,
		display: 'none',
	})
	tl.to('.loader-overlay-contain .top-shp, .loader-overlay-contain .bot-shp',{
		height: 0,
	})
	tl.to('.loader-overlay-contain',{
		display: 'none',
		onComplete: soundOnBg,
	})
	tl.from('.snake-bg',{
		y: "100%",
		opacity:0,
		duration:1,
		ease: "power4.out",
	})
	tl.from('.snake-bg img',{
		scale: 1.2,
		duration:0.5,
		ease: "power1.inOut",
	})
	tl.from('.water-bg',{
		y: "100%",
		opacity:0,
		duration:1,
		ease: "power4.out",
	})
	tl.from('.water-bg img',{
		scale: 1.2,
		duration:0.5,
		ease: "power1.inOut",
	})
	tl.from('.gun-bg',{
		y: "100%",
		opacity:0,
		duration:1,
		ease: "power4.out",
	})
	tl.from('.gun-bg img',{
		scale: 1.2,
		duration:0.5,
		ease: "power1.inOut",
	})
	tl.to(bgFade, {
		opacity: 1,
		duration: 0.5,
	})
	tl.to(activeItemIndicator, {
		width: "100%",
		duration: 1,
		ease: 'power1.inOut'
	})
	tl.from(typeSplit.lines, {
		y: "80%",
		opacity: 0,
		duration: 1,
		ease: 'power1.out',
		stagger: 0.1,
	})
	tl.from(".play_btns, .select_btns", {
		y: "-25px",
		opacity: 0,
		duration: 1,
		ease: 'power1.out',
		stagger: 0.1,
	})
	// tl.from(".round_counter", {
	// 	y: "30px",
	// 	opacity:0,
	// 	duration: 0.5,
	// })
}


function soundOnBg() {
	let snakeAudio = document.getElementById('snakeAudio');
	let waterAudio = document.getElementById('waterAudio');
	let gunAudio = document.getElementById('gunAudio');
	// Define a function to play sounds sequentially with a delay
	function playSequentialSoundsWithDelay(sounds, index) {
		if (index < sounds.length) {
			sounds[index].play();
			setTimeout(function() {
				playSequentialSoundsWithDelay(sounds, index + 1);
			}, 1800); // 1 second delay
		}
	}

	// Create an array of sounds
	let sounds = [snakeAudio, waterAudio, gunAudio];

	// Start playing sounds sequentially with a delay
	playSequentialSoundsWithDelay(sounds, 0);
}









let data = ["snake", "water", "gun"];
document.querySelectorAll('.playIcons').forEach(elem => 
{
	elem.disabled = true;
	elem.style.cursor = "no-drop";
	elem.style.filter = "saturate(0%)";
	elem.style.filter = "blur(5px)";
});



let roundIntervalId;
let countdownIntervalId;
let option;
let resultShow_box = document.getElementById("rsltShow_bx");



let startBtn = document.getElementById('start_btn');
startBtn.addEventListener('click', function() 
{

	// Click On Start Btn Then Play a Game Sound --------->
	let clickEffect = document.getElementById('audio');
	clickEffect.play();
	
	// Computer choose a random thing Code ----------->
	let randomIndex = Math.floor(Math.random() * data.length);
	console.log(data[randomIndex]);

	// Start Button Disable When Click On Start Btn --------->
	startBtn.disabled = true;
	startBtn.style.cursor = "no-drop"

	// Play Buttons Enabled On Click ------------->
	document.querySelectorAll('.playIcons').forEach(elem => 
	{
		elem.disabled = false;
		elem.style.cursor = "pointer";
		elem.style.filter = "blur(0px)";
	});

	let winSound = document.getElementById('winAudio');
	winSound.pause();
	let loseSound = document.getElementById('loseAudio');
	loseSound.pause();
	

	// Condition for SNAKE btn ---------->
	document.getElementById('snakeBtn').addEventListener('click', function() 
	{
		option = "snake";

		// Perform functions with timings code ---->
		setTimeout(myfunction, 10000);
		setTimeout(next_round);

		document.querySelectorAll('.playIcons').forEach(elem => 
		{
			elem.disabled = true;
			elem.style.cursor = "no-drop";
			elem.style.filter = "blur(5px)";
		});
		
		if (option == data[randomIndex]) 
		{
			document.getElementById('resultBox').innerHTML = "computer: Ohh no! we choose same thing";
			resultShow_box.innerHTML = "Match draw";
		}

		else if (option && data[randomIndex] == "water")
		{
			document.getElementById('resultBox').innerHTML = `computer: Ohh no! You win this round because i choose ${data[randomIndex]} and the snakes drink water`;
			resultShow_box.innerHTML = "You Win";
			// winSound.play();
		}

		else if (option && data[randomIndex] == "gun") 
		{
			document.getElementById('resultBox').innerHTML = `computer: Yes I win this round because i choose ${data[randomIndex]} and the snake will die from the gun`;
			resultShow_box.innerHTML = "You Lose";
			// loseSound.play();
		}
		
	})



	// Condition for WATER btn ---------->
	document.getElementById('waterBtn').addEventListener('click', function() 
	{
		option = "water";

		// Perform functions with timings code ------->
		setTimeout(myfunction, 10000);
		setTimeout(next_round);

		document.querySelectorAll('.playIcons').forEach(elem => {
			elem.disabled = true;
			elem.style.cursor = "no-drop";
			elem.style.filter = "blur(5px)";
		});
		
		if (option == data[randomIndex]) 
		{
			document.getElementById('resultBox').innerHTML = "computer: Ohh no! we choose same thing";
			resultShow_box.innerHTML = "Match draw";
		}

		else if (option && data[randomIndex] == "gun")
		{
			document.getElementById('resultBox').innerHTML = `computer: Ohh no! You win this round because i choose ${data[randomIndex]} and the gun sinks in water`;
			resultShow_box.innerHTML = "You Win";
			// winSound.play();
		}

		else if (option && data[randomIndex] == "snake") 
		{
			document.getElementById('resultBox').innerHTML = `computer: Yes I win this round because i choose ${data[randomIndex]} and the snakes drink water`;
			resultShow_box.innerHTML = "You Lose";
			// loseSound.play();
		}
	})

	

	// Condition for GUN btn ---------->
	document.getElementById('gunBtn').addEventListener('click', function() 
	{
		option = "gun";

		// Perform functions with timings code --------->
		setTimeout(myfunction, 10000);
		setTimeout(next_round);

		document.querySelectorAll('.playIcons').forEach(elem => {
			elem.disabled = true;
			elem.style.cursor = "no-drop";
			elem.style.filter = "blur(5px)";
		});
		
		if (option == data[randomIndex]) 
		{
			document.getElementById('resultBox').innerHTML = "computer: Ohh no! we choose same thing";
			resultShow_box.innerHTML = "Match Draw";
		}

		else if (option && data[randomIndex] == "snake")
		{
			document.getElementById('resultBox').innerHTML = `computer: Ohh no! You win this round because i choose ${data[randomIndex]} and the snakes will die from the gun`;
			resultShow_box.innerHTML = "You Win";
			// winSound.play();
		}

		else if (option && data[randomIndex] == "water") 
		{
			document.getElementById('resultBox').innerHTML = `computer: Yes I win this round because i choose ${data[randomIndex]} and the gun sinks in water`;
			resultShow_box.innerHTML = "You Lose";
			// loseSound.play();
		}
	})
})



function myfunction() 
{
	startBtn.disabled = false;
	startBtn.style.cursor = "pointer";
}





let result_popUp = document.getElementById('nextRound');
let play_buttons = document.getElementById('play_buttons_main');

function next_round() {
	result_popUp.classList.add('roundBox_show');
	play_buttons.classList.add('playBtn_cont_open');

	let next_round_count = 10;
	
	let result_open = setInterval(function() {
		next_round_count--;
		document.getElementById('next_Round').innerHTML = next_round_count;

		if (next_round_count === 0)
		{
			clearInterval(result_open);
			result_popUp.classList.remove('roundBox_show');
			play_buttons.classList.remove('playBtn_cont_open');
		}
	}, 1000);
}



