
// CODE TASK dla JAVA SCRIPT   039
// 
//W twoim kodzie są już :
//-  div z id "badGuy",
//- funkcja "badGuyStrikes()".
//
//Utwórz element script a w nim kod JavaScript, który dodaje do div "badGuy" akcję "badGuyStrikes()".
//
//(Jeśli masz mocne nerwy - możesz kliknąć badGuy'a.)

var correctHtmlResult = "Skrypt prawidłowy";

function executorCode() {
//var codeOutput = document.getElementById("codeOutput");
var codeOutput = document.body;
setAction();
var studentScript = codeOutput.getElementsByTagName("script")[1];
if(!studentScript) return "Brak elementu \"skrypt\"";
var studentFunction = studentScript.innerHTML.replace(/\n\r|\n|\r| |\t/g,"");
console.log(studentFunction);
if (studentFunction.indexOf(".addEventListener(\"click\",badGuyStrikes)") === -1)
    return "Brak przypisania eventu z funkcją badGuyStrikes";
return "Skrypt prawidłowy";
}
