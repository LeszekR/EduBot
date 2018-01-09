
var boardTable;
var boardSize = 5; // ct 001

//------------------------------------------------------------------------------
function init() {
    makeBoard();
}

//------------------------------------------------------------------------------
function makeNewBoard() {

    boardSize = document.getElementById("textSize").value;

    if (boardSize > 10)
        boardSize = 10;
    else if (boardSize < 3)
        boardSize = 3;

    var riskOfExplosion = document.getElementById("textRisk").value / 10;

    makeBoard();
    makeBoardFields(riskOfExplosion);
    document.getElementById('result').innerHTML = '';
}

//------------------------------------------------------------------------------
function makeBoard()
{
    var boardHtml = "<table>";
    var fieldId;

    for (var row = 0; row < boardSize; row++) {

        boardHtml += "<tr>";

        for (var column = 0; column < boardSize; column++) {
            fieldId = makeBoardFieldId(row, column);
            boardHtml += "<td><div class=\"boardButton\" id=\"" + fieldId + "\"></div></td>";
        }
        boardHtml += "</tr>";
    }

    boardHtml += "</table>";
    document.getElementById("board").innerHTML = boardHtml;

    checkTheBoard();
}

//------------------------------------------------------------------------------
function makeBoardFields(risk) {

    boardTable = [];
    var boardRow = [];

    var fieldButton;
    var fieldId;

    for (var row = 0; row < boardSize; row++) {

        boardRow = [];

        for (var column = 0; column < boardSize; column++) {

            fieldId = makeBoardFieldId(row, column);
            fieldButton = document.getElementById(fieldId);
            fieldButton.addEventListener("click", boardFieldClick);
            fieldButton.addEventListener("contextmenu", mineAlarm);

            var randomNumber = Math.random();
            if (randomNumber < risk)
                boardRow[column] = 1;
            else
                boardRow[column] = 0;

        }
        boardTable[row] = boardRow;
    }
}

//------------------------------------------------------------------------------
function blowAllMines(e) {
    var youAreKilled = false;

    for (var r = 0; r < boardSize; r++)
        for (var c = 0; c < boardSize; c++)
            if (boardTable[r][c] == 1) {
                BAM(r, c);
                youAreKilled = true;
            }

    if (youAreKilled)
        document.getElementById('result').innerHTML = "Saper ZGINĄŁ!!...";
}

//------------------------------------------------------------------------------
function BAM(wr, kl) {
    id = wr + "_" + kl;
    document.getElementById(id).classList.add("visitedMine");
}

//------------------------------------------------------------------------------
function nMinesAround(e) {
    var id = e.target.id;
    var row = getX(e);
    var col = getY(e);

    var n = 0;
    var wr;
    var kl;
    var rowOk;
    var colOk;
    var isNeighbour;

    for (var r = -1; r <= 1; r++)
        for (var c = -1; c <= 1; c++) {
            wr = Number(row) + r;
            kl = Number(col) + c;

            rowOk = (wr >= 0 && wr < boardSize);
            colOk = (kl >= 0 && kl < boardSize);
            isNeighbour = (wr != row || kl != col);

            if (rowOk && colOk && isNeighbour)
                n += boardTable[wr][kl];
        }
    document.getElementById(id).innerHTML = n;
}

//------------------------------------------------------------------------------
function boardFieldClick() {
    var e = window.event;

    var row = getX(e);
    var col = getY(e);

    var mine = boardTable[row][col];

    if (mine === 1)
        blowAllMines();
    else {
        nMinesAround(e);
        e.target.classList.add("visitedNoMine");
    }
}

//------------------------------------------------------------------------------
function makeBoardFieldId(row, column) {
    return row + "_" + column;
}

//------------------------------------------------------------------------------
function getX(e) {
    var id = e.target.id;
    var wspolrzedne = id.split("_");
    return wspolrzedne[0];
}
function getY(e) {
    var id = e.target.id;
    var wspolrzedne = id.split("_");
    return wspolrzedne[1];
}

//------------------------------------------------------------------------------
function mineAlarm(e) {

    // TODO tu można dorobić utratę punktów za uzyskiwanie podpowiedzi

    e.preventDefault();
    var boardField = e.target;

    var row = getX(e);
    var column = getY(e);

    if (boardTable[row][column] == 1)
        boardField.classList.add("mineIsHere");
}

//==============================================================================
// FUNKCJE KONTROLI KODU UCZNIA
function checkTheBoard() {
    var newBoard = document.getElementById("board");
    var n = newBoard.getElementsByTagName("tr").length;
    console.log(n);
}


////------------------------------------------------------------------------------
//function zakoncz(e) {
//    var id = e.target.id;
//    var row = dajX(e);
//    var col = dajY(e);
//    var id;
//    var r;
//    var c;
//
//    for (i = 1; i < size; i++) {
//
//        r = -i;
//        for (c = - i; c <= i; c++)
//            odkryjMine(row, col, r, c);
//        c--;
//
//        for (r++; r <= i; r++)
//            odkryjMine(row, col, r, c);
//        r--;
//
//        for (c--; c >= - i; c--)
//            odkryjMine(row, col, r, c);
//        c++;
//
//        for (r--; r >= - i + 1; r--)
//            odkryjMine(row, col, r, c);
//    }
//}
//
////------------------------------------------------------------------------------
//function odkryjMine(row, col, r, c) {
//    wr = Number(row) + Number(r);
//    kl = Number(col) + Number(c);
//    wrOk = (wr >= 0 && wr < size);
//    klOk = (kl >= 0 && kl < size);
//
//    if (wrOk && klOk)
//        if (board[wr][kl] == 1)
//            BUM(wr, kl)
//}
