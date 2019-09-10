var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

//starts the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//button behavior (sound, animation, records)
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//compare the two arrays
function checkAnswer(currLevel) {
  if (gamePattern[currLevel] == userClickedPattern[currLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
    restart();
  }
}

//play the next sequence and update the h1
function nextSequence() {

  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut("fast").fadeIn("fast");
  playSound(randomChosenColor);
}

//plays the correct sound corresponding to a name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animates currentColor
function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}

function gameOver() {
  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

function restart() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
