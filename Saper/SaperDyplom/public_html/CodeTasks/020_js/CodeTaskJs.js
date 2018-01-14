
// CODE TASK dla JAVA SCRIPT   020
// 
//Utwórz zmienne i przypisz im wartości: 
//"liczbaMin" : 100
//"liczbaSaperow" : 10
//"trzeźwySaper"  : "false"
//
//Napisz instrukcję "if" gdzie zmniejszasz liczbę min o 10 jeśli saper jest trzeźwy.
//
//Napisz instrukcję "if" gdzie zmniejszasz liczbę saperów o 1 jeśli saper nie jest trzeźwy.

var correctJsResult = 109;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var liczbaMin = 100;
    var liczbaSaperow = 10;
    var trzezwySaper = false;

    if (trzezwySaper)
        liczbaMin = liczbaMin - 10;

    if (!trzezwySaper)
        liczbaSaperow--;

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return liczbaMin + liczbaSaperow;
}
