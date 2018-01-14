
// CODE TASK dla JAVA SCRIPT   032
// 
//Utwórz element DOM <script>.
//
//Wewnątrz tego elementu utwórz nastepujący kod JavaScript: 
//1. Utwórz zmienną "divWesolaMusztra".
//2. Przypisz jej referencję do elementu DOM o "id" : "divWesolaMusztra".

var correctHtmlResult = "<script>vardivWesolaMusztra=document.getElementById(\"divWesolaMusztra\");</script>";

function executorCode() {

if (!divWesolaMusztra)
    return "Błąd - zmienna \"divWesolaMusztra\" nie została utworzona.";

document.getElementById("divWesolaMusztra").innerHTML = "Tu jest \"divWesolaMusztra\"";

var studentHtml = document.getElementById("studentHtml").innerHTML;
return studentHtml.replace(/\r\n|\r|\n|\t| /g, "");
}
