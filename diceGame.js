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
	return parseInt(numberOfSides)
}

function getNumber() {
	var allowedDiceSize = [4,6,8,10,12,20];
	var diceResult;
	var numberOfSides = getNumberOfSides();
	if (allowedDiceSize.indexOf(numberOfSides) > -1) {
		diceResult = rollDice(numberOfSides);
	}
	else{
		diceResult = "Not an allowed side. Roll again."
	}
	console.log(diceResult);
}

getNumber();