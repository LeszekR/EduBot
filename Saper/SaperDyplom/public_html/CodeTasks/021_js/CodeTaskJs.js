
// CODE TASK dla JAVA SCRIPT   021
// 
//Utwórz zmienne i przypisz im wartości: 
//"silaWybuchu" : 75
//"rodzajMiny"  : tylko deklaracja zmiennej, bez wartości
//
//Napisz instrukcję "if - else" gdzie ustawiasz rodzaj miny :
//1. jeśli siła wybuchu jest mniejsza niż 25 : "przeciwpiechotna" ,
//2. w pozostałych przupadkach : "przeciwpancerna".

var correctJsResult = "przeciwpancerna";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var silaWybuchu = 75;
    var rodzajMiny;

    if (silaWybuchu < 25)
        rodzajMiny = "przeciwpiechotna";
    else
        rodzajMiny = "przeciwpancerna";

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return rodzajMiny;
}
