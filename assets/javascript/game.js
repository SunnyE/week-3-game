var wordList = ["knicks", "bulls", "thunder", "warriors", "wolves", "hornets", "jazz", "wizards", "mavricks"];

// What letters will the program accept as input
var validLetters = [
	'a','b','c','d','e','f','g','h','i','j','k',
	'l','m','n','o','p','q','r','s','t','u','v',
	'w','x','y','z'
	];
var audio = new Audio("assets/audio/backgroundmusic.mp3");
// Verify user input against allowedLetters array
function acceptLetter(userInput){
	if (validLetters.indexOf(userInput) != -1){
		return true;
	}
}

// game object
var game = {

	// counters and containers
	guesses : 0,
	wins : 0,
	loses: 0,
	lettersUsed : [],
	gameBoard : [],
	word : "",

	// HTML updates
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
			"<p>Number of guesses remaining: </p>" + 
			"<p class='counter'>" + this.guesses + "</p>";
	},
	usedKeysCounter : function() {
		document.getElementById("letters-guessed").innerHTML = 
			"<p>Letters you already guessed: <p> " +
			"<p class='counter'>" + this.lettersUsed.join(", ") + "</p>";
	},
	gameDisplay : function() {
		document.getElementById("gamedisplay").innerHTML = 
			"<p>" + this.gameBoard.join(" ") + "</p>";
	},

	// Play sound of word
	youWin : function() {
		var audio = new Audio("assets/audio/right.mp3");
		audio.play();
	},
	youLose : function () {
		var audio = new Audio("assets/audio/miss.mp3");
		audio.play();
	},

	playBackgroundMusic: function () {
		var audio = new Audio("assets/audio/backgroundmusic.mp3");
		audio.play();
	},

	// start game
	start : function() {
		// set default values
		this.guesses = 8;
		this.gameBoard = [];
		this.lettersUsed = [];
		

		// set up display ( _ _ _ _ _ _ )
		this.word = wordList[ Math.floor(Math.random() * wordList.length) ];
		for (var i = 0; i < this.word.length; i++){
			this.gameBoard.push("_");
		}

		// refresh the HTML
		this.winCounter();
		this.guessCounter();
		this.gameDisplay();
		this.usedKeysCounter();
		
	},

	// input function that checks the input and then matches it to a 
	input : function(letter) {
		
		if( acceptLetter(letter) && this.lettersUsed.indexOf(letter) === -1) {


			for (var i = 0; i < this.word.length; i++) {

				if (letter === this.word[i]) {
					this.gameBoard[i] = letter;
					this.lettersUsed.push(letter); 
				} 

				}
				if (letter != this.word[i] && this.lettersUsed.indexOf(letter) === -1){
					this.guesses--;
					this.lettersUsed.push(letter); 
			}

			
			

			// update the HTML
					this.winCounter();
					this.loseCounter();
					this.guessCounter();
					this.gameDisplay();
					this.usedKeysCounter();

			//win counter and reset 
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