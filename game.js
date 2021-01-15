
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
let randomChosenColor, userChosenColor, randomNumber;


function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function nextSequence() {
    $('#level-title').text('Level ' + level);
    randomNumber =  Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level += 1;
    userClickedPattern = [];
}

function checkAnswer(userTrackingLength) {
    if (userClickedPattern[userTrackingLength - 1] === gamePattern[userTrackingLength - 1]) {
        playSound(userChosenColor);

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }        
    } else {
        gameOver();
    }
}

function gameOver(){
    playSound('wrong');
    $('body').addClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');
    setTimeout(function(){
        $('body').removeClass('game-over');
    }, 200);
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}


$(document).ready(function() {
    $(document).keydown(function(){
        if (level === 0){
            nextSequence();
        }
    });
    $(".btn").click(function(event) {
        userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        $("#" + userChosenColor).fadeOut(100).fadeIn(100);
        checkAnswer(userClickedPattern.length);
    });
    
});







