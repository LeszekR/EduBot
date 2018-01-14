
// CODE TASK dla JAVA SCRIPT   033
// 
//Utwórz element <div>  i nadaj mu "id" : "divCel"
//
//Utwórz element <script>
//
//Wewnątrz tego elementu <script> utwórz nastepujący kod JavaScript: 
//1. Utwórz zmienną i pobierz do niej referencję do "divCel"
//2. Wpisz do "divCel" tekst : "TRAFIENIE!".
        
var correctHtmlResult = "TRAFIENIE!";

function executorCode() {

if (!divCel)
    return "Błąd - zmienna nie została utworzona.";

return document.getElementById("divCel").innerHTML;
}
