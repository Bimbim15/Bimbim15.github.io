var game = document.getElementById("game");
var mode = document.getElementById("mode");
var level = document.getElementById("level");
var state = document.getElementById("status");

function personWindow() {
    mode.style.display = "none";
    game.style.display = "block";
}

function computerWindow() {
    level.style.display = "none";
    game.style.display = "block";
    startComputerMode();
}

function levelSelectWindow() {
    mode.style.display = "none";
    level.style.display = "block";
    document.getElementById("back2").style.display = "block";
}

function start2PlayerMode() {
    whichMode = "2Player";
    if (Math.random() < 0.5) {
        msg = "X";
        setStatus(msg + " Mulai kamu");
    } else {
        msg = "O";
        setStatus(msg + " Giliran kamu");
    }

}

function selectLevel(levelselect) {
    selectedLevel = levelselect.innerText;
    document.getElementById("back2").style.display = "none";
}

function startComputerMode() {
    whichMode = "Bimbim";

    if (Math.random() < 0.5) {
        msg = "X";
        setStatus(" kamu dulu");
    } else {
        msg = "O";
        setStatus("Giliran Bimbim");

        alldisable();

        setTimeout(function () {
            computerMove()
        }, 700);
        // computerMove();
    }
}

function randomPos() {
    var select = (Math.random() * 9) + 1;
    return document.getElementById("b" + Math.floor(select));
}

function checkCombination(x, y, z, fill, notBlank) {
    if (areEqual(x, y, z) && getPos(fill) == "" && getPos(notBlank) != "") {
        msg = "O";
        setPos(fill).innerText = msg;
        return true;
    }
    return false;
}

function checkCombinationGroup() {
    for (var j = 1; j <= 3; j++) {
        if (checkCombination(j, j + 3, j + 3, j + 6, j)) {
            return true;
        } else if (checkCombination(j + 3, j + 3, j + 6, j, j + 3)) {
            return true;
        } else if (checkCombination(j, j, j + 6, j + 3, j + 6)) {
            return true;
        }
    }

    for (var j = 1; j <= 9; j += 3) {
        if (checkCombination(j, j + 1, j + 1, j + 2, j)) {
            return true;
        } else if (checkCombination(j + 1, j + 1, j + 2, j, j + 1)) {
            return true;
        } else if (checkCombination(j, j, j + 2, j + 1, j + 2)) {
            return true;
        }
    }

    if (checkCombination(1, 5, 5, 9, 1)) return true;
    if (checkCombination(5, 5, 9, 1, 5)) return true;
    if (checkCombination(1, 1, 9, 5, 9)) return true;

    if (checkCombination(3, 5, 5, 7, 3)) return true;
    if (checkCombination(5, 5, 7, 3, 5)) return true;
    if (checkCombination(3, 3, 7, 5, 7)) return true;

    return false;
}

function winCombinationGroup(p, q, r) {
    if (getPos(p) == "" && getPos(q) == "" && getPos(r) == msg) {
        if (Math.random() < 0.5) {
            setPos(p).innerText = msg;
        } else {
            setPos(q).innerText = msg;
        }
        return true;
    } else {
        return false;
    }
}

function tryForWinCombination() {

    if (winCombinationGroup(9, 5, 1)) return true;
    if (winCombinationGroup(7, 5, 3)) return true;
    if (winCombinationGroup(9, 1, 5)) return true;

    if (winCombinationGroup(7, 3, 5)) return true;
    if (winCombinationGroup(5, 1, 9)) return true;
    if (winCombinationGroup(5, 3, 7)) return true;

    for (var j = 1; j <= 9; j += 3) {
        if (winCombinationGroup(j + 2, j + 1, j)) {
            return true;
        } else if (winCombinationGroup(j + 2, j, j + 1)) {
            return true;
        } else if (winCombinationGroup(j + 1, j, j + 2)) {
            return true;
        }
    }

    for (var j = 1; j <= 3; j++) {
        if (winCombinationGroup(j + 6, j + 3, j)) {
            return true;
        } else if (winCombinationGroup(j + 6, j, j + 3)) {
            return true;
        } else if (winCombinationGroup(j + 3, j, j + 6)) {
            return true;
        }
    }

    return false;

}

function ejet() {
    x = randomPos();
    while (x.innerText != "") {
        x = randomPos();
    }
    x.innerText = "O";
}

function medium() {

    if (checkCombinationGroup()) {
        return;
    }
    msg = "X";
    if (checkCombinationGroup()) {
        return;
    } else {
        ejet();
        msg = "O";
    }
}

function sumsah() {
    if (checkCombinationGroup()) {
        return;
    }
    msg = "X";
    if (checkCombinationGroup()) {
        return;
    } else {
        msg = "O";
        if (tryForWinCombination()) {
            return;
        } else {
            ejet();
        }
    }
}

function computerMove() {

    if (selectedLevel == "Mudah") {
        ejet();
    } else if (selectedLevel == "Medium") {
        medium();
    } else if (selectedLevel == "Sumsah") {
        sumsah();
    }

    if (!checkForWinner() && !draw()) {
        setStatus("Gimliran kamu")
        msg = "X";
    }
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.pointerEvents = "auto";
    }

}

function twoPlayer(clicked) {

    if (!checkForWinner() && !draw()) {
        if (clicked.innerText != "") {
            setStatus("Jangan disitu")
        } else {

            clicked.innerText = msg;
            if (msg == "X" && !checkForWinner() && !draw()) {
                msg = "O";
                setStatus(msg + " Pilih posisi");
            } else if (msg == "O" && !checkForWinner() && !draw()) {
                msg = "X";
                setStatus(msg + " Pilih posisi");
            }
        }
    }
}

function draw() {
    for (var t = 1; t < 10; t++) {
        if (document.getElementById("b" + t).innerText == "") {
            break;
        }
    }
    if (t == 10) {
        setStatus(" Seri");
        return true;
    }
    return false;
}

function Computer(clicked) {

    if (!checkForWinner() && !draw()) {
        if (clicked.innerText != "") {
            setStatus("Jangan Disitu")
        } else {
            clicked.innerText = msg;
            if (msg == "X" && !checkForWinner() && !draw()) {
                msg = "O";
                setStatus("Gimliran Bimbim");
                alldisable();
                setTimeout(function () {
                    computerMove()
                }, 500);
            }
        }
    }
}

function firstMove() {
    var count = 0;
    var countPos = 0;
    for (var k = 1; k <= 9; k++) {
        if (getPos(k) != "") {
            countPos = k;
            count++;
        }
    }

    if (count == 1)
        return countPos;
    else
        return false;
}

function getPos(k) {
    return document.getElementById("b" + k).innerText;
}

function setPos(k) {
    return document.getElementById("b" + k);
}

function setStatus(message) {
    state.innerText = message;
}

function areEqual(a, b, c) {
    if (getPos(a) == msg && getPos(b) == msg && getPos(c) == msg) {
        return true;
    } else {
        return false;
    }
}

function checkForWinner() {
    if (areEqual(1, 2, 3) || areEqual(4, 5, 6) || areEqual(7, 8, 9) ||
        areEqual(1, 4, 7) || areEqual(2, 5, 8) || areEqual(3, 6, 9) ||
        areEqual(1, 5, 9) || areEqual(3, 5, 7)) {
        if (whichMode == "Bimbim") {
            if (msg == "X") {
                setStatus("Pro, Kamu menang:v");
            } else {
                setStatus("Noob, kamu kalah:v");
            }
        } else {
            setStatus("Selamat " + msg + " Menang");
        }
        return true;
    }
    return false;
}

function clickevent(clicked) {

    if (whichMode == "2Player") {
        twoPlayer(clicked);
    } else {
        Computer(clicked);
    }
}

function reset() {
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerText = "";
    }
    if (whichMode == "Bimbim") {
        startComputerMode();
    } else {
        start2PlayerMode();
    }
}

function back() {
    if (whichMode == "2Player") {
        game.style.display = "none";
        mode.style.display = "block";
    } else {
        game.style.display = "none";
        level.style.display = "block";
        document.getElementById("back2").style.display = "block";
    }
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).innerText = "";
    }
}

function back2() {
    level.style.display = "none";
    mode.style.display = "block";
    document.getElementById("back2").style.display = "none";
}

function alldisable() {
    for (var i = 1; i < 10; i++) {
        document.getElementById("b" + i).style.pointerEvents = "none";
    }
}