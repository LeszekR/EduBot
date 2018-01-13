
// CODE TASK dla JAVA SCRIPT   019
// 
//Utwórz element "input" z takimi atrybutami:
//"id": "pizzaNow"
//"type" : "button"
//"value" : "Chcę pizzę teraz!"
//
//Gdy przycisk się pojawi, kliknij go

var correctHtmlResult = 2;

function executorCode() {

var n = 0;
var pizza = document.getElementById("pizzaNow");

if (pizza !== undefined) {
    if (pizza.getAttribute("type") === "button")
        n++;
    if (pizza.getAttribute("value") === "Chcę pizzę teraz!")
        n++;
}

pizza.addEventListener("click", function() {    
    document.getElementById("odpowiedz").innerHTML = 
        "pizza wyszła! będzie za tydzień!<br>jak chce to kartofle mamy od ręki";
});

return n;
}
