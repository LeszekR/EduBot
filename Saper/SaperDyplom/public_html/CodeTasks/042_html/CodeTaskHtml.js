
// CODE TASK dla JAVA SCRIPT   042
// 
//W twoim kodzie są 
//- dwa przyciski o id : "batman" i "joker",
//- funkcja "dieForever".
//
//Utwórz element script, a w nim następujący kod:
//- utwórz funkcję "youAreHistory",
//- w funkcji przypisz każdemu z przycisków event "contextmenu", który wywołuje funkcję "dieForever"
//
//Kliknij przyciski kilka razy PRAWYM przyciskiem myszy.

var correctHtmlResult = "Skrypt prawidłowy";

function executorCode() {

var codeOutput = document.getElementById("codeOutput");
//var codeOutput = document.body;
youAreHistory();
var studentScript = codeOutput.getElementsByTagName("script")[0];
if(!studentScript) return "Brak elementu \"skrypt\"";
var studentFunction = studentScript.innerHTML.replace(/\n\r|\n|\r| |\t/g,"");
if (studentFunction.indexOf(".addEventListener(\"contextmenu\",dieForever)") < 0)
    return "Nie ustawiono reakcji na event \"contextmenu\"";
return "Skrypt prawidłowy";

}
