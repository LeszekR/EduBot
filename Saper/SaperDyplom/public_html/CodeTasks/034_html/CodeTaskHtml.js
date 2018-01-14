
// CODE TASK dla JAVA SCRIPT   034
// 
//Utwórz tabelkę z 2 wierszami i 3 komórkami w każdym wierszu.
//Nadaj jej id : "tabelka".
//
//Do każdej komórki wpisz jej współrzędne 
//- jako 2 liczby oddzielone znakiem "-" (bez spacji)
//- liczone od 0
//- od góry do dołu i od lewej do prawej
//- najpierw pionowa, potem pozioma
//
//Np. w wierszu 1 od góry komórka 2 od lewej będzie miała współrzędne:
//0-1
        
var correctHtmlResult = 
"<tableid=\"tabelka\"><tbody><tr><td>0-0</td><td>0-1</td><td>0-2</td></tr><tr><td>1-0</td><td>1-1</td><td>1-2</td></tr></tbody></table>";

function executorCode() {

var tab = document.getElementById("tabelka");
if (!tab) return "Brak tabelki";

var rows = tab.children[0].children;
if (!rows) return "Brak wierszy";
if (rows.length !== 2) return "Nieprawidłowa liczba wierszy";

var cells = rows[0].children;
if (!cells) return "Brak komórek 0";
if (cells.length !== 3) return "Nieprawidłowa liczba komórek 0";

var cells = rows[1].children;
if (!cells) return "Brak komórek 1";
if (cells.length !== 3) return "Nieprawidłowa liczba komórek 1";

var studentHtml = document.getElementById("studentHtml").innerHTML;
return studentHtml.replace(/\r\n|\r|\n|\t| /g, "");
}
