"use strict";

function rollDice(numberOfSides) {
	var randomNumber = Math.random();
	var numberFloat = randomNumber * numberOfSides + 1;
	var diceResult = Math.floor(numberFloat);
	return diceResult;
}

function getNumberOfSides() {
	var numberOfSides = prompt(
		"Selec one of the following dice:\n" +
		"- Press 4 for a 4-sided dice.\n" +
		"- Press 6 for a 6-sided dice.\n" +
		"- Press 8 for a 8-sided dice.\n" +
		"- Press 10 for a 10-sided dice.\n" +
		"- Press 12 for a 12-sided dice.\n" +
		"- Press 20 for a 20-sided dice.\n");
	return parseInt(numberOfSides);
}

function rollMultipleDize(numberOfSides, numberOfDice) {
	var rollResults = [];
	for (var roll = 0; roll < numberOfDice; roll++) {
		rollResults.push(rollDice(numberOfSides));
	}
	//console.log(rollResults)
	return rollResults;
}



function fullDiceGame() {
	var playerScores1 = [];
	var playerScores2 = [];
	var winnerOfRounds = [];
	var diceSizes = [4,6,8,10,12,20];
	
	for(var currentDiceIndex in diceSizes) {
		for (var player = 1; player <= 2; player++) {

			var finalResult = [];
			for (var numberOfRolls = 1; numberOfRolls <= 3; numberOfRolls++) {
				var diceRoll = rollMultipleDize(diceSizes[currentDiceIndex],5-finalResult.length);
				if (numberOfRolls === 3) {
					finalResult = finalResult.concat(diceRoll);
				}
				else {
					var diceCheck = rollAgain(diceRoll,player,diceSizes[currentDiceIndex]);

					if (diceCheck == diceRoll) {
						finalResult = finalResult.concat(diceCheck);
						break;
					}
					else {
						finalResult = finalResult.concat(diceCheck);
					}
				}
				
				
			}

			if (player === 1) {
				playerScores1.push(getRoundScore(finalResult));
			}
			else {
				playerScores2.push(getRoundScore(finalResult));	
			}
		}

		if (playerScores1[currentDiceIndex] == playerScores2[currentDiceIndex]) {
			winnerOfRounds.push(0);
		}
		else if (playerScores1[currentDiceIndex] > playerScores2[currentDiceIndex]) {
			winnerOfRounds.push(1);
		}
		else {
			winnerOfRounds.push(2);
		}

	}

	console.log(playerScores1);
	console.log(playerScores2);
	console.log(winnerOfRounds);
}

function rollAgain(diceRoll,player,diceSize) {
	console.log(diceRoll)
	var rollAgainAnswer = prompt(
			"Player " + player + ". You are currently rolling a " + diceSize + "-sided dices.\n" +
			"Your current dice roll can be viewed as the last line in the Console.\n" +
			//diceRoll + "\n"
			"Would you like to roll the dice again? (yes/no)");
	switch(rollAgainAnswer) {
		case "yes":  
			return keepDice(diceRoll);
			break;
		case "no":
			return diceRoll;
			break;
		default:
			return rollAgain(diceRoll,player,diceSize);

	}

}

function keepDice(diceRoll) {
	var keptDice = [];
	var exitAnswer = 99
	while(exitAnswer != 0) {
		exitAnswer = parseFloat(prompt(
				"Which of the rolled dice would you like to keep?\n" +
				"- Enter the values you would like to keep.\n" +
				"- All dice with the same value will be saved.\n" +
				"- Enter 0 if there are no more dice (if any) you would like to keep."));
		if (keptDice.indexOf(exitAnswer) < 0) {
			keptDice = keptDice.concat(diceRoll.filter(function(dice){
				if(dice == exitAnswer){
					return true;
				}
				else {
					return false;
				}
			}))
		}
	}
	return keptDice;
}
function getRoundScore(finalResult) {
	var orderedResult = finalResult.sort(function(a,b) {return a - b});
	var diceValue = [];
	var frequencyOfValue = [];
	var previousDiceValue;
	var roundScore;
	for (var diceIndex in orderedResult) {
		if (orderedResult[diceIndex] !== previousDiceValue) {
			diceValue.push(orderedResult[diceIndex]);
			frequencyOfValue.push(1);
		}
		else {
			frequencyOfValue[frequencyOfValue.length - 1] ++;
		}
		previousDiceValue = orderedResult[diceIndex];
	}
	if (diceValue[0] != 1) {
		roundScore = 0;
	}
	else{
		var value = diceValue[1];
		var frequency = frequencyOfValue[1];
		for(var frequencyIndex = 2; frequencyIndex < diceValue.length; frequencyIndex++) {
			if (frequency <= frequencyOfValue[frequencyIndex]) {
				value = diceValue[frequencyIndex];
				frequency = frequencyOfValue[frequencyIndex];
			}
		}
		roundScore = parseFloat((frequencyOfValue[0] + frequency).toString() + value.toString()) ;
	}
	return roundScore
}
//getNumber();
//console.log(rollMultipleDize(6,5))
//rollAgain(rollMultipleDize(6,5))
//console.log(rollAgain(rollMultipleDize(6,5)))
fullDiceGame()