
// CODE TASK dla JAVA SCRIPT   041
// 
//W twoim kodzie są dwa przyciski oraz div z id : "callerId".
//Każdy z nich wywołuje tę samą funkcję "aKuKu".
//
//Utwórz element script, a w nim następujący kod:
//- utwórz funkcję "aKuKu", pobierając jako argument event, który ją wywołuje,
//- wewnątrz tej funkcji odczytaj źródło eventu,
//- odczytaj "id" źródła,
//- ustaw innnerHTML elementu "callerId" jako uzyskane id źródła.
//
//(Możesz kliknąć przyciski.)

var correctHtmlResult = true;

function executorCode() {

setAction();
var divId = document.getElementById("callerId");
document.getElementById("Good_guy").click();
if(divId.innerHTML !== "Good_guy") return "Kliknięcie nie działa";
divId.innerHTML = "";
return true;
}
