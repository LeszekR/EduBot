
var board;
var size = 5;


//------------------------------------------------------------------------------
function init() {
    console.log("zaczynam");
    generateBoard(5, 5);
}

//------------------------------------------------------------------------------
function zakoncz(e) {
    var id = e.target.id;
    var row = dajX(e);
    var col = dajY(e);
    var id;
    var r;
    var c;

    for (i = 1; i < size; i++) {

        r = -i;
        for (c = - i; c <= i; c++)
            odkryjMine(row, col, r, c);
        c--;

        for (r++; r <= i; r++)
            odkryjMine(row, col, r, c);
        r--;

        for (c--; c >= - i; c--)
            odkryjMine(row, col, r, c);
        c++;

        for (r--; r >= - i + 1; r--)
            odkryjMine(row, col, r, c);
    }
}

//------------------------------------------------------------------------------
function odkryjMine(row, col, r, c) {
    wr = Number(row) + Number(r);
    kl = Number(col) + Number(c);
    wrOk = (wr >= 0 && wr < size);
    klOk = (kl >= 0 && kl < size);

    if (wrOk && klOk)
        if (board[wr][kl] == 1)
            BUM(wr, kl)
}

//------------------------------------------------------------------------------
function BUM(wr, kl) {
    id = "bb_" + wr + "_" + kl;
    document.getElementById(id).classList.add("visitedMine");
}

//------------------------------------------------------------------------------
function minyWokol(e) {
    var id = e.target.id;
    var row = dajX(e);
    var col = dajY(e);

    var n = 0;
    var wr;
    var kl;
    var wrOk;
    var klOk;
    var inna;

    for (r = - 1; r <= 1; r++)
        for (c = -1; c <= 1; c++) {
            wr = Number(row) + r;
            kl = Number(col) + c;

            wrOk = (wr >= 0 && wr < size);
            klOk = (kl >= 0 && kl < size);
            inna = (wr != row || kl != col);

            if (wrOk && klOk && inna)
                n += board[wr][kl];
        }
    document.getElementById(id).innerHTML = n;
}

//------------------------------------------------------------------------------
function dajX(e) {
    var id = e.target.id;
    var wsp = id.split("_");
    return wsp[1];
}

function dajY(e) {
    var id = e.target.id;
    var wsp = id.split("_");
    return wsp[2];
}

//------------------------------------------------------------------------------
function fieldButtonClick() {
    var e = window.event;
    var klawisz = e.button;

    var row = dajX(e);
    var col = dajY(e);


    if (klawisz == 2)
        e.target.classList.add("uwagaMina");

    else {
        var boardRow = board[row];
        var mine = boardRow[col];

        minyWokol(e);

        e.target.classList.toggle("uwagaMina", false);
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
function generateNewBoard() {
    size = document.getElementById("boardSize").value;
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
            fieldButton.addEventListener("contextmenu", uwagaMina);

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
function getFieldId(boardField) {
    var id = boardField.getAttribute('id');
    return id;
}

//------------------------------------------------------------------------------
function uwagaMina(e) {

    // TODO tu można dorobić utratę punktów za uzyskiwanie podpowiedzi

    var evn = e || window.event;
    evn.preventDefault();
    var boardField = evn.target;

    var id = getFieldId(boardField);
    var idElements = id.split("_");
    var row = idElements[1];
    var column = idElements[2];

    if (board[Number(row)][+column] == 1)
        boardField.classList.add("uwagaMina");
}

//==============================================================================
// FUNKCJE KONTROLI KODU UCZNIA
function checkTheBoard() {
    var newBoard = document.getElementById("board");
    var n = newBoard.getElementsByTagName('tr').length;
    console.log(n);
}
