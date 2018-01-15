
// CODE TASK dla JAVA SCRIPT   039
// 
//W twoim kodzie są już :
//- div z id "badGuy",
//- funkcja "badGuyStrikes()".
//
//Dodaj do div "badGuy" akcję "badGuyStrikes()".
//
//Jeśli masz mocne nerwy - możesz kliknąć.


var correctHtmlResult = true;

function executorCode() {
setAction();
var studentScript = document.getElementById("codeOutput").children[4];
if(!studentScript) return "Brak elementu \"skrypt\"";
var studentFunction = studentScript.innerHTML.replace(/\n\r|\n|\r| |\t/g,"");
if (studentFunction.indexOf(".addEventListener(\"click\",badGuyStrikes)") === -1)
    return "Brak przypisania eventu z funkcją badGuyStrikes";
return true;
}
