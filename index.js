var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;
function playSound(color) {
  var button = new Audio("sounds/" + color + ".mp3");
  button.play();
}
function animatePress(buttonPressed) {
  buttonPressed.addClass("pressed");
  setTimeout(function() {
    buttonPressed.removeClass("pressed");
  }, 100);
}
function animateWrong() {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
}
function clickHandler() {
  var buttonPressed = $(this);
  var userChosenColour = buttonPressed.attr("id");
  playSound(userChosenColour);
  animatePress(buttonPressed);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}
function nextSequence() {
  // Generates a random number between 0 and 3

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    animateWrong();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  startGame = false;
  gamePattern = [];
  level = 0;
}
$(document).keypress(function(){
  if(!startGame) {
    nextSequence()
    startGame = true;
  }
})
$(".btn").click(clickHandler);
