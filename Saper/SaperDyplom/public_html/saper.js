
var board;
var size = 5;

//------------------------------------------------------------------------------
function generateNewBoard() {
    size = document.getElementById("boardSize").value;
    
    if (size > 10)
        size = 10;
    
    var riskOfExplosion = document.getElementById("txRyzyko").value / 10;

    generateBoard();
    generateBoardFields(riskOfExplosion);
}

//------------------------------------------------------------------------------
function generateBoard()
{
    var boardHtml = "<table>";
    var fieldId;

    for (var row = 0; row < size; row++) {

        boardHtml += "<tr>";

        for (var column = 0; column < size; column++) {
            fieldId = createBoardFieldId(row, column);
            boardHtml += "<td><div class=\"boardButton\" id=\"" + fieldId + "\"></div></td>";
        }
        boardHtml += "</tr>";
    }

    boardHtml += "</table>";
    document.getElementById("board").innerHTML = boardHtml;
    
    checkTheBoard();
}

//------------------------------------------------------------------------------
function generateBoardFields(risk) {

    board = [];
    var boardRow = [];

    var fieldButton;
    var fieldId;

    for (var row = 0; row < size; row++) {

        boardRow = [];

        for (var column = 0; column < size; column++) {

            fieldId = createBoardFieldId(row, column);
            fieldButton = document.getElementById(fieldId);
            fieldButton.addEventListener("click", fieldButtonClick);
            fieldButton.addEventListener("contextmenu", mineAlarm);

            var randomNumber = Math.random();
            if (randomNumber < risk)
                boardRow[column] = 1;
            else
                boardRow[column] = 0;

        }
        board[row] = boardRow;
    }
}

//------------------------------------------------------------------------------
function zakoncz(e) {
    for (var r = 0; r < size; r++)
        for (var c = 0; c < size; c++)
            if (board[r][c] == 1)
                BUM(r,c);
}

//------------------------------------------------------------------------------
function BUM(wr, kl) {
    id = "bb_" + wr + "_" + kl;
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

            rowOk = (wr >= 0 && wr < size);
            colOk = (kl >= 0 && kl < size);
            isNeighbour = (wr != row || kl != col);

            if (rowOk && colOk && isNeighbour)
                n += board[wr][kl];
        }
    document.getElementById(id).innerHTML = n;
}

//------------------------------------------------------------------------------
function fieldButtonClick() {
    var e = window.event;
    var klawisz = e.button;

    var row = getX(e);
    var col = getY(e);


    if (klawisz == 2)
        e.target.classList.add("mineIsHere");

    else {
        var mine = board[row][col];

        nMinesAround(e);

        e.target.classList.toggle("mineIsHere", false);
        if (mine === 1) {
            e.target.classList.add("visitedMine");
            zakoncz(e);
        }
        else {
            e.target.classList.add("visitedNoMine");
        }
    }
}

//------------------------------------------------------------------------------
function createBoardFieldId(row, column) {
    return "bb_" + row + "_" + column;
}

//------------------------------------------------------------------------------
function getX(e) {
    var id = e.target.id;
    var wspolrzedne = id.split("_");
    return wspolrzedne[1];
}
function getY(e) {
    var id = e.target.id;
    var wspolrzedne = id.split("_");
    return wspolrzedne[2];
}

//------------------------------------------------------------------------------
function mineAlarm(e) {

    // TODO tu można dorobić utratę punktów za uzyskiwanie podpowiedzi

    e.preventDefault();
    var boardField = e.target;

    var row = getX(e);
    var column = getY(e);

    if (board[row][column] == 1)
        boardField.classList.add("mineIsHere");
}

//------------------------------------------------------------------------------
function init() {
//    console.log("zaczynam");
    generateBoard(5, 5);
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
