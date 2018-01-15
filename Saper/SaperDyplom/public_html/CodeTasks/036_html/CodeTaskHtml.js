
// CODE TASK dla JAVA SCRIPT   036
// 
//Utwórz element "input" i :
//- nadaj mu jakieś "id",
//- ustaw jego typ jako "text",
//- ustaw jego atrybut "value" na wartość 18 
//(Uwaga: wartość atrybutu zawsze podajemy w cudzysłowie - tak samo dla stringów i liczb).
//
//Utwórz element "script".
//Napisz w nim kod JavaScript, który :
//- tworzy zmienną "size",
//- przypisuje tej zmiennej wartość pobraną z utworzonego "input".


var correctHtmlResult = 18;

function executorCode() {

var newInput = document.getElementById("studentHtml").children[0];

if (!newInput) 
    return "Brak elementu \"input\"";

if (newInput.tagName !== "INPUT") 
    return "Brak elementu \"input\"";

return newInput.getAttribute("value");
}
