function generateWinningNumber(){
	return Math.ceil(Math.random()*100);
}

function shuffle(array){
	var max = array.length, index, temp;

	while(max){
		index = Math.floor(Math.random() * max--);

		temp = array[max];
		array[max] = array[index];
		array[index] = temp;
		
	}

	return array;

}

function newGame(){
	
	return new Game();
}


function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();


}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber;
}



Game.prototype.playersGuessSubmission = function(num){
	if(typeof num != "number" || num <1 || num >100){
		throw("That is an invalid guess.")
	}
	else{
		this.playersGuess = num;
		return this.checkGuess();
	}
	
}

Game.prototype.checkGuess = function(){ //checkGuess will return output to be displayed in <title element>

	if(this.playersGuess === this.winningNumber){
		//what to happen when player submits winning guess??
		$('#subtitle').text("Press Reset to play again!");
		return "You Win!";	
	}
	else if(this.pastGuesses.indexOf(this.playersGuess) > -1){ //Guess isn't winner, but is duplicate
		return "You have already guessed that number.";
	}
	else{
		this.pastGuesses.push(this.playersGuess); //Guess is not winning and not repeat. Must add to pastGuesses and update display
		console.log("im adding a guess to list");
		$('#guess-list li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess);

	}

	if(this.pastGuesses.length ===5){
		return "You Lose.";
	}
	if(this.difference() <10){
		return "You're burning up!";
	}
	else if(this.difference() < 25){
		return "You're lukewarm.";
	}
	else if(this.difference() < 50){
		return "You're a bit chilly.";
	}
	else
		return "You're ice cold!";
	


}

Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber,generateWinningNumber(), generateWinningNumber()]);
}

function makeGuess(game){
	var guess = $('#guess-input').val(); //extracts guess into var
	$('#guess-input').val(''); //sets value in input to blank string
	
	var output = game.playersGuessSubmission(parseInt(guess, 10));
	console.log("hi");
	$('#title').text(output);

}

$(document).ready(function() {
   console.log('The page is all loaded!');

   var game = new Game();

   $('#submit-guess-button').click(function(e){ //binds makeGuess() function to submit button
   	makeGuess(game);

   });

   $('#guess-input').keypress( function(e){ //makes enter with active inpput submit guess
   		if(e.which == 13)
   			makeGuess(game);
   })

   $('#reset-button').click(function(e){
   	game = newGame();

   	$('#title').text("This is The Guessing Game!!!");
	$('#subtitle').text("Guess an integer between 1 and 100!");
	$('.guess').text('-');
	$('#give-hint-button, #submit').prop('disabled', false);
   });

   $('#give-hint-button').click(function(e){
   	var hints = game.provideHint();
   	$('#title').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
   })

});



