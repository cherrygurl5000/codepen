//Challenge 1: Your Age in Days
function ageindays() {
  var birthYear = prompt("What year were you born?");
  var agedays = (2018-birthYear)*365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + agedays + ' days old!');
  h1.appendChild(textAnswer);
  document.getElementById('answerPlacement').appendChild(h1);
}

function reset() {
  document.getElementById('answerPlacement').innerHTML = "";
}

//Challenge 2: Cat Generator
function generateCat() {
  var image = document.createElement('img');
  var div = document.getElementById('flexcat');
  image.src = "http://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
  image.classList.add("my-3");
  image.classList.add("shadow-lg");
  image.classList.add("img-fluid");
  div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
  var humanChoice;
  var botChoice;
  var options = ["rock", "paper", "scissors"];
 
  botChoice = options[Math.floor(Math.random()*options.length)];
  humanChoice = yourChoice.id;
  
  var results = decideWinner(humanChoice, botChoice); 
  var message = finalMessage(results); console.log(message);
  var frontEnd = rpsFrontEnd(humanChoice, botChoice, message);
}

function decideWinner(hchoice, bchoice) {
  var rpsDatabase = {
    "rock": {"rock": 0.5, "paper": 0, "scissors": 1},
    "paper": {"rock": 1, "paper": 0.5, "scissors": 0},
    "scissors": {"rock": 0, "paper": 1, "scissors": 0.5},
  };
  var yourScore = rpsDatabase[hchoice][bchoice];
  var compScore = rpsDatabase[bchoice][hchoice];
  return [yourScore, compScore];
}
function finalMessage(result) {
  var text;
  
  if(result[0] > result[1]) {
    text = ["You WON!", "color: green"];
  }
  else if(result[0]  < result[1]) {
    text = ["You LOST!", "color: red"];
  }
  else {
    text = ["You TIED!", "color: blue"];
  }
  return text;
}
function rpsFrontEnd(hchoice, bchoice, msg) {
  var imagesDB = {
    "rock": document.getElementById("rock").src,
    "paper" : document.getElementById("paper").src,
    "scissors" : document.getElementById("scissors").src,
  };
  
 //Remove all images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();
  
  var flexed = document.getElementById('flexbox-rps');  
  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var textDiv = document.createElement("div");
  
  humanDiv.innerHTML = "<img src='"+imagesDB[hchoice]+"' height=150 width=150 alt='"+hchoice+" Image' id='"+hchoice+"' style='box-shadow: 0px 0px 15px 10px blue;' >";
  botDiv.innerHTML = "<img src='"+imagesDB[bchoice]+"' height=150 width=150 alt='"+bchoice+" Image' id='"+bchoice+"' style='box-shadow: 0px 0px 15px 10px orange;' >";
  textDiv.innerHTML = "<h2 class='mt-4' style='"+msg[1]+"'>"+msg[0]+"</h2>";
  
  flexed.appendChild(humanDiv);
  flexed.appendChild(textDiv);
  flexed.appendChild(botDiv);
}