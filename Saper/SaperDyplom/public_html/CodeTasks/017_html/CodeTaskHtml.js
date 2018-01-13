
// CODE TASK dla JAVA SCRIPT   017
// 
//Utwórz jeden pod drugim elementy:
//- "input"
//- "button"
//
//(Możesz kliknąć przycisk i wpisać coś w input ale na razie nie wywoła to żadnej akcji.)

var correctHtmlResult = 2;

function executorCode() {

var inputs = document.getElementById("studentHtml").getElementsByTagName("input");
var nInput = 0;
var nButton = 0;

for (var i = 0; i < inputs.length; i++)
    if (inputs[i].getAttribute("type") === "text")
        nInput++;
    else if (inputs[i].getAttribute("type") === "button")
        nButton++;

return nInput + nButton;
}
