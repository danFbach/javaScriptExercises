"use strict"
const readline = require('readline');

const getData = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var node = new Node(null,null,null);
var newInput = new UserInput();

newInput.bstOptions();

function Node(value, left, right){
	this.value = value;
	this.left = left;
	this.right = right;
	this.newData = function(value){
		if(this.value === null){			
			node = new Node(value,null,null);
		}
		if(value === this.value){
			if(newInput){
				newInput.bstOptions();
			}
		}
		else if(value < this.value)
		{
			if(this.left)
			{
				this.left.newData(value);
				return;
			}
			else
			{
				this.left = new Node(value, null, null);
				console.log("You've added",value,"as a new node.")
				newInput.bstOptions();
			}
		}
		else if(value > this.value)
		{
			if(this.right)
			{
				this.right.newData(value);
				return;
			}
			else
			{
				this.right = new Node(value, null, null);
				console.log("You've added",value,"as a new node.");
				newInput.bstOptions();
			}
		}
	};
	this.displayNodePath = function(value, directions){
		if(value === this.value){
			console.log('For the value of', value, directions, value+'.');
			newInput.bstOptions();
		}
		else if(value < this.value){
			if(this.left){
				var leftWord = 'left';
				directions = directions.concat(' ',this.value,', ',leftWord);
				this.left.displayNodePath(value, directions);
			}else{
				console.log('The node,', value,'does not exist.');
				newInput.bstOptions();
			}
		}else if(value > this.value){
			if(this.right){
				var rightWord = 'right';
				directions = directions.concat(' ',this.value,', ',rightWord)
				this.right.displayNodePath(value, directions);
			}else{
				console.log('The node,', value,'does not exist.');
				newInput.bstOptions();
			}
		}else{
			console.log('Invalid Entry.');
			newInput.bstOptions();
		}
	};
};

function UserInput(){
	this.bstOptions = function(){
		getData.question(' | 1) Add | 2) Search | 3) Display Tree | 4) Quit? | ', function(answer){
			answer = Number(answer);
			if(answer === 1){
				newInput.addNode();
			}
			else if(answer === 2){
				newInput.searchNode();
			}
			else if(answer === 3){
				console.log(node);
				newInput.bstOptions();
			}
			else if(answer === 4){
				getData.close();
			}
			else{
				console.log('Invalid Entry.');
				newInput.bstOptions();
			}
		});
	};
	this.addNode = function(){
		getData.question('Please enter a number for a new node. ', function(answer){
			answer = Number(answer);
			if(0 <= answer || 0 > answer){
				node.newData(answer);
			}
			else{
				console.log('Invalid Entry.');
				newInput.bstOptions();
			}
		});
	};
	this.searchNode = function(){
		getData.question('Please enter a number to search for. ', function(answer){
			answer = Number(answer);
			var directions = "the directions are root";
			node.displayNodePath(answer, directions);
		});
	};
}