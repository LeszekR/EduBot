
// CODE TASK dla JAVA SCRIPT   037
// 
//Utwórz zmienną "tabHtml".
//
//Dobuduj do niej string w którym będą:
//- div , posiadający atrybut id : "divTab", 
//- wewnątrz div tabelka z 1 wierszem i 2 komórkami
//- w każdej komórce element input
//- atrybuty każdego input : id jako numer kolejny (zaczynając od 0), value - ten sam numer
//
//Pamiętaj aby zamykać każdy element tagiem kończącym w odpowiednim miejscu stringu.


var correctJsResult = "<div id=\"divTab\"><table><tr><td><input id=\"0\" value=\"0\"></td><td><input id=\"1\" value=\"1\"></td></row></table></div><style>#codeOutput * {padding: 2px;margin: 4px;} #codeOutput table {width: 100%;height: 5rem;border: 2px solid green;} #codeOutput tr {width: 90%;height: 1.4rem;} #codeOutput td {width: 1.3rem;height: 1rem;border: 2px solid blue;}</style>";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var tabHtml = "<div id=\"divTab\">";
    tabHtml+= "<table><tr>";
    tabHtml+= "<td><input id=\"0\" value=\"0\"></td>";
    tabHtml+= "<td><input id=\"1\" value=\"1\"></td>";
    tabHtml+= "</row></table>";
    tabHtml+= "</div>";
    
    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
//var codeOutput = document.getElementById("codeOutput");
var codeOutput = document.body;
codeOutput.innerHTML = tabHtml;

tab = codeOutput.children[0].children[0];
if (!tab) return "Brak tabelki";

var rows = tab.children[0].children;
if (!rows) return "Brak wierszy";
if (rows.length !== 1) return "Nieprawidłowa liczba wierszy";

var cells = rows[0].children;
if (!cells) return "Brak komórek";
if (cells.length !== 2) return "Nieprawidłowa liczba komórek";

var inp;
inp = document.getElementById("0");
if (!inp) return "Brak \"input\" 0";
if (inp.value != 0) return "Nieprawidłowa wartość w \"input\" 0";
inp = document.getElementById("1");
if (!inp) return "Brak komórki 1";
if (inp.value != 1) return "Nieprawidłowa wartość w \"input\" 1";


//tabHtml += "<style>#codeOutput * {padding: 2px;margin: 4px;} "
//+ "#codeOutput table {width: 100%;height: 5rem;border: 2px solid green;} "
//+ "#codeOutput tr {width: 90%;height: 1.4rem;} "
//+ "#codeOutput td {width: 1.3rem;height: 1rem;border: 2px solid blue;}</style>";
tabHtml += "<style>* {padding: 2px;margin: 4px;} "
+ "table {width: 100%;height: 5rem;border: 2px solid green;} "
+ "tr {width: 90%;height: 1.4rem;} "
+ "td {width: 1.3rem;height: 1rem;border: 2px solid blue;}</style>";

return tabHtml.replace(/(     )(   )(  )/g, " ");
}
