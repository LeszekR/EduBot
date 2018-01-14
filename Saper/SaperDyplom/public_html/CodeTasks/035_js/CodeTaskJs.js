
// CODE TASK dla JAVA SCRIPT   035
// 
//Utwórz zmienną "plansza" i przypisz jej wartość "<table>".
//
//Za pomocą podwójnej pętli "for" dobuduj do tej zmiennej daszy string, który utworzy tabelkę.
//
//Tabelka ma mieć 5 wierszy i 8 kolumn.
//
//W zewnętrznym "for" twórz wiersze.
//W zagnieżdżonym "for" twórz komórki.
//
//Potem dołącz jeszcze string : "</table>".


var correctJsResult = "<table><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table><style>#codeOutput * {padding: 2px;margin: 4px;} #codeOutput table {width: 100%;height: 20rem;border: 2px solid green;} #codeOutput tr {width: 90%;height: 1.4rem;} #codeOutput td {width: 1.3rem;height: 1rem;border: 2px solid blue;}</style>";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var plansza = "<table>";
    for (var i = 0; i < 5; i++) {
        plansza += "<tr>";
        for (var j = 0; j < 8; j++)
            plansza += "<td></td>";
        plansza += "</tr>";
    }
    plansza += "</table>";

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
var codeOutput = document.getElementById("codeOutput");
codeOutput.innerHTML = plansza;

tab = codeOutput.children[0];
if (!tab) return "Brak tabelki";

var rows = tab.children[0].children;
if (!rows) return "Brak wierszy";
if (rows.length !== 5) return "Nieprawidłowa liczba wierszy";

var cells = rows[0].children;
if (!cells) return "Brak komórek";
if (cells.length !== 8) return "Nieprawidłowa liczba komórek";

plansza += "<style>#codeOutput * {padding: 2px;margin: 4px;} "
+ "#codeOutput table {width: 100%;height: 20rem;border: 2px solid green;} "
+ "#codeOutput tr {width: 90%;height: 1.4rem;} "
+ "#codeOutput td {width: 1.3rem;height: 1rem;border: 2px solid blue;}</style>";

return plansza;
}
