
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let firstKeyPress = true;

//checks for fist keypress
$(document).ready(function () {

    $(document).keydown(function(){
        if(firstKeyPress){
            firstKeyPress = false;
            nextSequence();
        }
    })
})

// Function to generate the next sequence in the game
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  level++;
  $("h1").text("Level " + level);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  checkUserPattern();
}

$(".btn").on("click", function(event){
    let userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    console.log(userChosenColor);
    console.log(userClickedPattern);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    }
    else{
        let bodyElement = $("body");

        bodyElement.addClass("game-over");
        setTimeout(function(){
            bodyElement.removeClass("game-over");
        }, 2000);

        playSound("wrong");

        $("h1").text("Game Over! Press Any Key to Restart.");

        startOver();
        console.log("wrong")
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    firstKeyPress = true;
}

