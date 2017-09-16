
var board;
var size = 5;


//------------------------------------------------------------------------------
function init() {
    console.log("zaczynam");
//    var pole = document.getElementById("boardSize");
//    pole.addEventListener("onkeyup", generateNewBoard);
    generateBoard(5, 5);
}

//------------------------------------------------------------------------------
function testuj(){
    console.log("testuję");
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

    if (wrOk && klOk) {
        if (board[wr][kl] == 1) {
            BUM(wr, kl)
        }
    }
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
function uwagaMina(e) {
    var evn = e || window.event;
    evn.preventDefault();
    evn.target.classList.add("uwagaMina");
}

//------------------------------------------------------------------------------
function boardButtonClick() {
    var e = window.event;
    var klawisz = e.button;
  
    var row = dajX(e);
    var col = dajY(e);
    
    
    if (klawisz == 2) {
        e.target.classList.add("uwagaMina");
    }
    else {
        var boardRow = board[row];
        var mine = boardRow[col];

        minyWokol(e);
        
        e.target.classList.toggle("uwagaMina", false);
        if (mine === 1) {
            e.target.classList.add("visitedMine");
            zakoncz(e);
        } else {
            e.target.classList.add("visitedNoMine");
        }
    }
}

//------------------------------------------------------------------------------
function bbId(row, col) {
    return "bb_" + row + "_" + col;
}

//------------------------------------------------------------------------------
function generateBoard(ryzyko)
{
    var rows = size;
    var cols = size;
    var code = "<table>";

    board = [];

    for (var r = 0; r < rows; r++) {
        code += "<tr>";
        for (var c = 0; c < cols; c++)
        {
            var id = bbId(r, c);
            code += "<td><div class=\"boardButton\" id=\"" + id + "\"></div></td>";
        }
        code += "</tr>";
    }

    code += "</table>";
    document.getElementById("board").innerHTML = code;

    for (var r = 0; r < rows; r++) {
        var boardRow = [];
        for (var c = 0; c < cols; c++) {
            var id = bbId(r, c);
            var bb = document.getElementById(id);
            bb.addEventListener("click", boardButtonClick);
            bb.addEventListener("contextmenu", uwagaMina);
            
            var rnd = Math.random();
            if (rnd < ryzyko) {
                boardRow[c] = 1;
            } else {
                boardRow[c] = 0;
            }

        }
        board[r] = boardRow;
    }
}

//------------------------------------------------------------------------------
function generateNewBoard() {
    size = document.getElementById("boardSize").value;
    var ryzyko = document.getElementById("txRyzyko").value / 10;
    generateBoard(ryzyko);
}
