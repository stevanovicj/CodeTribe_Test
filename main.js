var sounds = [
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
];

function playSound(id) {
	sounds[id].play();
}

var inputEnabled = false;
var stepList = [rand(0, 3),rand(0, 3)];
var currentStep = 0;
var timeout;
var fields = document.querySelectorAll('.field');
var info = document.querySelector('#info');
var startButton = document.querySelector('#start');
var resetButton = document.querySelector('#reset');

for (var i = 0; i < fields.length; i++) {
	const val = i;
	fields[i].onclick = function () {
		if (!inputEnabled) return;

		playSound(val);
		if (val === stepList[currentStep]) {
			if (currentStep + 1 === stepList.length) {
				console.log(currentStep);
				inputEnabled = false;
				if (stepList.length < 20) {
					generateLastStep();
					alert("Congratulations!");
					timeout = setTimeout(showSteps, 2000);
					currentStep = 0;
				}
				else {
					alert("Congratulations! You won!");
					timeout = setTimeout(reset, 2000);
				}
			}
			else {
				currentStep++;
			}
		}
		else {
			inputEnabled = false;
			reset();
			alert("You have lost!");

		}
	}
}

startButton.onclick = function () {
	this.disabled = true;
	start();
}

resetButton.onclick = reset;

function reset() {
	startButton.disabled = false;
	stepList = [rand(0, 3),rand(0, 3)];
	currentStep = 0;
	inputEnabled = false;
	clearTimeout(timeout);
	info.innerHTML = "Welcome to Simon Game!";
}


function start() {
	generateLastStep();
	info.innerHTML = 'Watch the sequence!';
	timeout = setTimeout(showSteps, 2000);
}


function generateLastStep() {
	stepList.push(rand(0, 3));
}

function showSteps() {
	if (currentStep > stepList.length - 1) {
		currentStep = 0;
		info.innerHTML = stepList.length + ' steps';
		inputEnabled = true;
		return;
	}

	var id = stepList[currentStep];

	playSound(id);
	fields[id].className += ' active';

	setTimeout(function () {

		fields[id].className = fields[id].className.replace(' active', '');

		currentStep++;

		timeout = setTimeout(showSteps, 0.3 * 1000); 

	}, 0.6 * 1000);

	info.innerHTML = "Watch the sequence!";
}


function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}