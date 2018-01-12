
// CODE TASK dla JAVA SCRIPT   009
// 
//Utwórz zmienną ""boardHtml""  i przypisz jej wartość ""<table>"".
//
//Dołącz do niej następujące stringi używając operacji z przypisaniem:
//
//"<tr>"
//"<td></td>"
//"<td></td>"
//"</tr>"
//
//"<tr>"
//"<td></td>"
//"<td></td>"
//"</tr>"
//
//"</table>"
//
//W taki sposób tworzy się w JavaScript nowy element HTML - tu: tabelkę z wierszem. 
//Tak utworzony string mozna następnie wstawić na stronę (zobaczysz jak w dalszej części kursu).

var correctJsResult = "<table><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var boardHtml = "<table>";

    boardHtml += "<tr>";
    boardHtml += "<td></td>";
    boardHtml += "<td></td>";
    boardHtml += "</tr>";

    boardHtml += "<tr>";
    boardHtml += "<td></td>";
    boardHtml += "<td></td>";
    boardHtml += "</tr>";

    boardHtml += "</table>";

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
var css = document.createElement('style');
css.innerHTML += "table, table * {"
css.innerHTML += "width: 12rem;";
css.innerHTML += "height: 3rem;";
css.innerHTML += "border: 1px solid black;";
css.innerHTML += "margin-left: 2px;";
css.innerHTML += "margin-top: 2px;";
css.innerHTML += "padding: 2px;";
css.innerHTML += "padding-top: 0;"
css.innerHTML += "}"


var divOutput = document.getElementById('codeOutput');
divOutput.innerHTML = boardHtml;
divOutput.appendChild(css);

return boardHtml;
}
