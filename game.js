var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var pressed = false;

$(".btn").click(function () {
  if (pressed) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    checkUser(userClickedPattern.length - 1);
  }
});

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
    pressed = true;
  }
});

function playAudio(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

animatePress = (currentColor) => {
  var color = "." + currentColor;
  $(color).addClass("pressed");

  setTimeout(() => {
    $(color).removeClass("pressed");
  }, 100);
};

checkUser = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gameRestart();
  }
};

gameRestart = () => {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
};
nextSequence = () => {
  level++;

  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(randomChosenColor);
};
