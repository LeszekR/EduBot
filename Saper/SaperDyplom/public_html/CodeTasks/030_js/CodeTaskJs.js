
// CODE TASK dla JAVA SCRIPT   030
// 
//Utworz zmienne : "babcia" i "wnuczek".
//
//Utworz funkcje "wyprawaDoLasu" pobierającą argument "nWilkow"
//
//Wewnątrz funkcji przypisz wartości zmiennym: 
//"babcia" : "nWilkow" pomnożone przez 0.6
//"wnuczek" : "nWilkow" pomnożone przez 0.1
//Uwaga - miejsca dziesiętne oddzialamy kropką.
        
var correctJsResult = "17 wilków popełniło błąd napadając Babcię z wnuczkiem.<br>Babcia zabiła 10.2, a wnuczek 1.7 wilka.";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var babcia, wnuczek;
    
    function wyprawaDoLasu(nWilkow) {
        babcia = nWilkow * 0.6;
        wnuczek = nWilkow * 0.1;
    }

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
wyprawaDoLasu(17);
return "17 wilków popełniło błąd napadając "
        + "Babcię z wnuczkiem.<br>Babcia zabiła " 
        + +babcia.toFixed(1) + ", a wnuczek " 
        + +wnuczek.toFixed(1) + " wilka.";
}
