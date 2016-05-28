// array with teams 
var wordList = ["knicks", "bulls", "thunder", "warriors", "wolves", "hornets", "jazz", "wizards", "mavricks", "pistons", "spurs", "heat"];

// usable letters 
var validLetters = [
	'a','b','c','d','e','f','g','h','i','j','k',
	'l','m','n','o','p','q','r','s','t','u','v',
	'w','x','y','z'
	];

// background music
var audio = new Audio("assets/audio/backgroundmusic.mp3");
// check if the input is valid
function acceptLetter(userInput){
	if (validLetters.indexOf(userInput) != -1){
		return true;
	}
}

// the game object 
var game = {

	// arrays, containers and viables 
	guesses : 0,
	wins : 0,
	loses: 0,
	lettersUsed : [],
	gameBoard : [],
	word : "",

	// update the content on the HTML document
	winCounter : function() {
		document.getElementById("win-counter").innerHTML = 
			"<p>Wins: </p> " +
			"<p class='counter'>" + this.wins + "</p>";
	},
	loseCounter : function() {
		document.getElementById("lose-counter").innerHTML = 
			"<p>loses: </p> " +
			"<p class='counter'>" + this.loses + "</p>";
	},
	guessCounter : function() {
		document.querySelector("#guess-counter").innerHTML = 
			"<p>Guesses remaining: </p>" + 
			"<p class='counter'>" + this.guesses + "</p>";
	},
	usedKeysCounter : function() {
		document.getElementById("letters-used").innerHTML = 
			"<p>Letters you have used: <p> " +
			"<p class='counter'>" + this.lettersUsed.join(", ") + "</p>";
	},
	gameDisplay : function() {
		document.getElementById("gamedisplay").innerHTML = 
			"<p>" + this.gameBoard.join(" ") + "</p>";
	},

	// function to reset the hangman picute 
	resetPicture : function() {
		document.getElementById("start").style.opacity = "1";
		document.getElementById("wrong1").style.opacity= "0";
		document.getElementById("wrong2").style.opacity = "0";
		document.getElementById("wrong3").style.opacity = "0";
		document.getElementById("wrong4").style.opacity = "0";
		document.getElementById("wrong5").style.opacity = "0";
		document.getElementById("wrong6").style.opacity = "0";
		document.getElementById("wrong7").style.opacity = "0";
		document.getElementById("wrong8").style.opacity = "0";

	},

	// plays audio when the player wins or loses 	
	youWin : function() {
		var audio = new Audio("assets/audio/right.mp3");
		audio.play();
	},
	youLose : function () {
		var audio = new Audio("assets/audio/miss.mp3");
		audio.play();
	},



	// starting the game 
	start : function() {
		// initializing vaiables and arrays 
		this.guesses = 8;
		this.gameBoard = [];
		this.lettersUsed = [];
		

		// makes a blank display 
		this.word = wordList[ Math.floor(Math.random() * wordList.length) ];
		for (var i = 0; i < this.word.length; i++){
			this.gameBoard.push("_");
		}

		// refresh the content on HTML document
		this.winCounter();
		this.loseCounter();
		this.guessCounter();
		this.gameDisplay();
		this.usedKeysCounter();
		this.resetPicture();
		
	},

	// input function that checks if letter guessed is in the game word
	input : function(letter) {
		
		if( acceptLetter(letter) && this.lettersUsed.indexOf(letter) === -1) {


			for (var i = 0; i < this.word.length; i++) {

				if (letter === this.word[i]) {
					var correct = new Audio("assets/audio/swish.mp3");
					correct.play();
					this.gameBoard[i] = letter;
					this.lettersUsed.push(letter); 
				} 

				}
				if (letter != this.word[i] && this.lettersUsed.indexOf(letter) === -1){
					var miss = new Audio("assets/audio/buzzer1.mp3");
					miss.play();
					this.guesses--;
					this.lettersUsed.push(letter); 
			}
			// removes doubles and triples of letters 
			for(var i=0; i < this.lettersUsed.length; i++){

			if(this.lettersUsed[i]=== this.lettersUsed[i+1]){
				this.lettersUsed.splice(i,1);
			}
			if(this.lettersUsed[i]=== this.lettersUsed[i+1] && this.lettersUsed[i]=== this.lettersUsed[i+2]){
				this.lettersUsed.splice(i,2);
			}
		}
			// updating of the picture as each guess goes down 
			if (this.guesses == 8) {		
				 document.getElementById("start").style.opacity = "1";

			} else if (this.guesses == 7) {		
				 document.getElementById("wrong1").style.opacity= "1";

			} else if (this.guesses == 6) {		
				 document.getElementById("wrong2").style.opacity = "1";

			} else if (this.guesses == 5) {		
				 document.getElementById("wrong3").style.opacity = "1";

			} else if (this.guesses == 4) {		
				 document.getElementById("wrong4").style.opacity = "1";

			} else if (this.guesses == 3) {		
				 document.getElementById("wrong5").style.opacity = "1";

			} else if (this.guesses == 2) {		
				 document.getElementById("wrong6").style.opacity = "1";

			} else if (this.guesses == 1) {		
				 document.getElementById("wrong7").style.opacity = "1";

			} else if (this.guesses == 0) {		
				 document.getElementById("wrong8").style.opacity = "1";

			}
			 

			// update the HTML
					this.winCounter();
					this.loseCounter();
					this.guessCounter();
					this.gameDisplay();
					this.usedKeysCounter();

			//win and lose counter and reset function 
			if (this.gameBoard.indexOf('_') === -1){
				this.wins++;
				this.youWin();
				this.start();
			}

			if (this.guesses <= 0) {
				this.loses++; 
				this.youLose();
				this.start();
			}
		}
	}
}

// onload event
document.onLoad = game.start();

// onkeyup events
document.onkeyup = function(event){
	var userInput = String.fromCharCode(event.keyCode).toLowerCase();
	game.input(userInput);
	audio.play();
}