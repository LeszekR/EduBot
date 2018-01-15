
// CODE TASK dla JAVA SCRIPT   Saper_001
// 
//UWAGA: do tego zadania możesz skopiować i tylko wzbogacić kod utworzony przez 
//ciebie do poprzedniego zadania, gdzie trzeba było zbudować tabelkę, tworząc string z jej kodem.
//
//Kroki
//1. W twoim kodzie html jest już element "input" z id "textSize". 
//Utwórz zmienną "size" i pobierz do niej "value" tego elementu.
//
//2. Teraz zbudujesz tabelkę, która ma mieć tyle samo wierszy i kolumn - tyle ile przechowuje zmienna "size".
//Równocześnie nadasz każdej komórce tabelki unikalne id.
//
//Utwórz zmienną "fieldId".
//Utwórz zmienną "boardHtml" i przypisz jej wartość "<table>".
//
//Za pomocą podwójnej pętli "for" dobuduj do "boardHtml" daszy string, który 
//utworzy tabelkę. 
//
//W zewnętrznym "for" twórz wiersze. 
//
//W zagnieżdżonym "for" 
//- nadawaj zmiennej "fieldId" wartość jako string ze złączonych 3 elementów: 
//        iteratora zewnętrznej pętli, 
//        znaku "_" 
//        iteratora wewnętrznej pętli,
//- twórz html komórki jako string wstawiając pomiędzy tagi komórki string: "id=" + fieldId + " class=\"boardButton\"".
//
//Uwaga: string " class=\"boardButton\"" dodaje klasę CSS do każdej komórki. Skopiuj go i wklej - musi być identyczny.
//
//Na koniec dołącz do "boardHTML" string : "</table>".


var correctJsResult = "<table><tr><td id=0_0 class=\"boardButton\"></td><td id=0_1 class=\"boardButton\"></td><td id=0_2 class=\"boardButton\"></td><td id=0_3 class=\"boardButton\"></td></tr><tr><td id=1_0 class=\"boardButton\"></td><td id=1_1 class=\"boardButton\"></td><td id=1_2 class=\"boardButton\"></td><td id=1_3 class=\"boardButton\"></td></tr><tr><td id=2_0 class=\"boardButton\"></td><td id=2_1 class=\"boardButton\"></td><td id=2_2 class=\"boardButton\"></td><td id=2_3 class=\"boardButton\"></td></tr><tr><td id=3_0 class=\"boardButton\"></td><td id=3_1 class=\"boardButton\"></td><td id=3_2 class=\"boardButton\"></td><td id=3_3 class=\"boardButton\"></td></tr></table><style>.boardButton{width: 2rem;height: 2rem;background-color: lightgray;border: solid black;margin: 0.1rem;font-family: \"Arial\", sans-serif;font-style: normal;font-weight: bold;font-size: 1.3rem;text-align: center;vertical-align: bottom;}</style>";

function studentJsCode() {

var inp = document.createElement("input");
inp.id = "textSize";
inp.style = "border: 2px solid grey;height:1.6rem;";
inp.value = 4;

var divInput = document.createElement("div");
divInput.style = "width: 90%; height: 2rem;";
divInput.appendChild(inp);

var divOutput = document.getElementById("codeOutput");
divOutput.appendChild(divInput);


    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var size = document.getElementById("textSize").value;

    var boardHtml = "<table>";
    var fieldId;

    for (var row = 0; row < size; row++) {
        boardHtml += "<tr>";
        for (var col = 0; col < size; col++) {
            fieldId = row + "_" + col;
            boardHtml += "<td" + " id=" + fieldId + " class=\"boardButton\"" + "></td>";
        }
        boardHtml += "</tr>";
    }
    boardHtml += "</table>";



    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
divOutput.innerHTML = boardHtml;

tab = divOutput.children[0];
if (!tab) return "Brak tabelki";

var rows = tab.children[0].children;
if (!rows) return "Brak wierszy";
if (rows.length !== 4) return "Nieprawidłowa liczba wierszy";

var cells = rows[0].children;
if (!cells) return "Brak kolumn";
if (cells.length !== 4) return "Nieprawidłowa liczba kolumn";

var cell = document.getElementById("2_3");
if (!cell) return "Brak id lub id są nieprawidłowe";

boardHtml += "<style>.boardButton{"
+"width: 2rem;height: 2rem;background-color: lightgray;"
+"border: solid black;margin: 0.1rem;font-family: \"Arial\", sans-serif;"
+"font-style: normal;font-weight: bold;font-size: 1.3rem;"
+"text-align: center;vertical-align: bottom;}</style>";

return boardHtml;
}
