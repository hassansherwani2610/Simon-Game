var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;
$(document).keydown(function(){
  if(!started){
    nextSequence()
    started = true;
  }
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout (function(){
        nextSequence();
      }, 1000)
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Press Any Key to Restart!");

    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);

    starOver();
  }
};

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  btnAnimate(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);

  var randomChosenColor = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomChosenColor]
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function btnAnimate(name) {
  $("#" + name).addClass("pressed");

  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
};

function starOver(){
  gamePattern = []
  started = false;
  level = 0;
}