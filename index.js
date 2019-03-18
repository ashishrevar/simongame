
var gameColors = ["red", "green", "blue", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = ($(this).attr("id"));
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateButton(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            $("#level-title").text("Level " + level);
            nextsequence();
        }
    }
    else{
        $("#level-title").text("Game over, press a key to start");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;  
}

function animateButton(colorName){
    $("#"+colorName).addClass("pressed");
    setTimeout(function(){
        $("#"+colorName).removeClass("pressed");
    },100);
}

function nextsequence(){
    userClickedPattern = [];
    level++;
    var randomChosenColor = (gameColors[Math.floor(Math.random()*4)]);
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(randomChosenColor){
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
}