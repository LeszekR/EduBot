
// CODE TASK dla JAVA SCRIPT   040
// 
//W twoim kodzie jest przycisk wywołujący funkcję badGuyHoliday().
//
//Utwórz element script, a w nim następujący kod:
//- utwórz funkcję "badGuyHolliday", pobierając jako argument event, który ją wywołuje.
//- wewnątrz tej funkcji wywołaj inną : funkcję "holliday" (jest już utworzona).
//
//(Na razie nic nie rób z pobranym eventem, to za chwilę.)


var correctHtmlResult = "Skrypt prawidłowy";

function executorCode() {
var codeOutput = document.getElementById("codeOutput");
var codeOutput = document.body;
setAction();
var studentScript = codeOutput.getElementsByTagName("script")[1];
if(!studentScript) return "Brak elementu \"skrypt\"";
var studentFunction = studentScript.innerHTML.replace(/\n\r|\n|\r| |\t/g,"");
if (studentFunction.indexOf("badGuyHolliday(e){") < 0)
    return "Brak pobrania eventu jako argument funkcji \"holliday\"";
return "Skrypt prawidłowy";

}
