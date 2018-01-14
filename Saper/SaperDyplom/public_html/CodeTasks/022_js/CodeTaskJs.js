
// CODE TASK dla JAVA SCRIPT   022
// 
//Utwórz zmienne i przypisz im wartości: 
//"liczbaMin" : 100
//"liczbaSaperow" : 10
//"saperNeurotyk"  : 31
//
//Napisz instrukcję "if - else if - else" gdzie :
//1. zmniejszasz liczbę min o 1  jeśli neurotyzm sapera jest większy niż 80,
//2. zmnjeszasz liczbę min o 20, jesli neurotyzm sapera jest większy niż 30
//3. zmniejszasz liczbę saperów o 1 jeśli żaden z poprzednich warunków nie zachodzi.

var correctJsResult = 90;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var liczbaMin = 100;
    var liczbaSaperow = 10;
    var saperNeurotyk = 31;

    if (saperNeurotyk > 80)
        liczbaMin = liczbaMin - 1;
    else if (saperNeurotyk > 30)
        liczbaMin = liczbaMin - 20;
    else
        liczbaSaperow--;

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return liczbaMin + liczbaSaperow;
}
