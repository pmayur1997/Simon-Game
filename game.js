var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var wrong = wrong;
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }
    } else {
        wrongCall();
        startover();
    }

}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var Color = buttonColors[randomNumber];
    gamePattern.push(Color);
    $("#" + Color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(Color);
}

function playSound(name) {
    var sounds = new Audio('sounds/' + name + '.mp3');
    sounds.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

function wrongCall() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
}

function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}