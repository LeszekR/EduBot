
// CODE TASK dla JAVA SCRIPT   018
// 
//Utwórz poniższe elementy i nadaj im podane atrybuty:
//
//Najpierw:
//- "div": id "przygotujAtak"
//
//potem wewnątrz tego "div" utwórz 2 elementy:
//- "input": typ "text", id "tekstCel"
//- "input": typ "button", id "przycAtak"

var correctHtmlResult = 3;

function executorCode() {

var nPrzygotuj = 0;
if (document.getElementById("przygotujAtak") !== undefined)
    nPrzygotuj++;

var nInput = 0;
var tekstCel = document.getElementById("tekstCel");
if (tekstCel != undefined)
    if (tekstCel.getAttribute("type") === "text")
        nInput++;

var nButton = 0;
var tekstCel = document.getElementById("przycAtak");
if (tekstCel != undefined)
    if (tekstCel.getAttribute("type") === "button")
        nButton++;

return nPrzygotuj + nInput + nButton;
}
