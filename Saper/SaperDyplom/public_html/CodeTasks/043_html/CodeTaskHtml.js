
// CODE TASK dla JAVA SCRIPT   043
// 
//W twoim kodzie już są:
//- przycisk wywołujący funkcję "jokersDream" na prawy przycisk myszy,
//- funkcja "dream".
//
//Utwórz element script, a w nim następujący kod:
//- utwórz funkcję "jokersDream", pobierając jako argument event, który ją wywołuje.
//- wewnątrz tej funkcji :
//        1. wyłącz domyślne zdarzenie eventu pobranego do funkcji,
//        2. wywołaj funkcję "dream".
//
//Kliknij przycisk prawym przyciskiem - czy menu kontekstowe przestało się pojawiać?

var correctHtmlResult = "Skrypt prawidłowy";

function executorCode() {

var codeOutput = document.getElementById("codeOutput");
//var codeOutput = document.body;
setAction();
var studentScript = codeOutput.getElementsByTagName("script")[0];
if(!studentScript) return "Brak elementu \"skrypt\"";
var studentFunction = studentScript.innerHTML.replace(/\n\r|\n|\r| |\t/g,"");
if (studentFunction.indexOf(".preventDefault();") < 0)
    return "Nie wyłączono menu kontekstowego";
return "Skrypt prawidłowy";

}
