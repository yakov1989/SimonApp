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

$(".start").click(function () {
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
    $("h1").text("Game Over, Press Start");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

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
  var time = 0;
  level++;
  $("h1").text("Level " + level);

  if (gamePattern.length > 0) {
    for (var i = 0; i < gamePattern.length; i++) {
      console.log(gamePattern[i]);
      let actual = gamePattern[i];
      setTimeout(function () {
        this.flashButton(actual);
        this.playAudio(actual);
      }, i * 500);
      time = i * 500;
    }
  }

  if (gamePattern.length === 0) {
    handleNewSequnce();
  } else {
    setTimeout(function () {
      handleNewSequnce();
    }, time + 500);
  }

  // if (gamePattern.length > 0) {
  //   var interval = setInterval(function () {
  //     setTimeout(function () {
  //       this.flashButton(gamePattern[index]);
  //       this.playAudio(gamePattern[index]);
  //     }, 500);
  //     index++;
  //     if (index >= gamePattern.length) {
  //       clearInterval(interval);
  //       this.handleNewSequnce();
  //     }
  //   }, 600);
  // } else {
  //   handleNewSequnce();
  // }
};

handleNewSequnce = () => {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  flashButton(randomChosenColor);
  playAudio(randomChosenColor);
};

flashButton = (color) => {
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};
