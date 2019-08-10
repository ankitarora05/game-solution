let card = document.getElementsByClassName("card");
let Blocks = [...card];
const grid = document.getElementById("card-grid");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1")
var clickedBlocks = [];

function generateRandomBlock(array) {
    var index = array.length, tempVal, randIndex;

    while (index !== 0) {
        randIndex = Math.floor(Math.random() * index);
        index -= 1;
        tempVal = array[index];
        array[index] = array[randIndex];
        array[randIndex] = tempVal;
    }

    return array;
};
function startGame() {
    clickedBlocks = [];
    Blocks = generateRandomBlock(Blocks);
    for (var i = 0; i < Blocks.length; i++) {
        grid.innerHTML = "";
        [].forEach.call(Blocks, function (item) {
            grid.appendChild(item);
        });
        Blocks[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#000000";
        stars[i].style.visibility = "visible";
    }
    sec = 0;
    min = 0;
    hrs = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "Time: 00:00:00";
    clearInterval(interval);
}

var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    clickedBlocks.push(this);
    var len = clickedBlocks.length;
    if (len === 2) {
        moveCounter();
        if (clickedBlocks[0].type === clickedBlocks[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};

function matched() {
    clickedBlocks[0].classList.add("match", "disabled");
    clickedBlocks[1].classList.add("match", "disabled");
    clickedBlocks[0].classList.remove("show", "open", "no-event");
    clickedBlocks[1].classList.remove("show", "open", "no-event");
    clickedBlocks = [];
}

function unmatched() {
    clickedBlocks[0].classList.add("unmatched");
    clickedBlocks[1].classList.add("unmatched");
    disable();
    setTimeout(function () {
        clickedBlocks[0].classList.remove("show", "open", "no-event", "unmatched");
        clickedBlocks[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        clickedBlocks = [];
    }, 1100);
}

function disable() {
    Array.prototype.filter.call(Blocks, function (card) {
        card.classList.add('disabled');
    });
}

function enable() {
    Array.prototype.filter.call(Blocks, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
        sec = 0;
        min = 0;
        hrs = 0;
        startTimer();
    }

    if (moves > 11 && moves < 20) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 20) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function onSuccess() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}

function restartGame() {
    modal.classList.remove("show");
    startGame();
}


function setDigit(digit) {
    var str = digit + '';
    if (digit < 10) {
        str = "0" + str;
    }
    return str;
}

var sec = 0, min = 0; hrs = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = "Time: " + setDigit(hrs) + ":" + setDigit(min) + ":" + setDigit(sec);
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hrs++;
            min = 0;
        }
    }, 1000);
}

for (var i = 0; i < Blocks.length; i++) {
    card = Blocks[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", onSuccess);
};

window.onload = restartGame();
