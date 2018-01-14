
// CODE TASK dla JAVA SCRIPT   026
// 
//Utwórz zmienne i przypisz im wartości: 
//"liczbaMin" : 10
//"liczbaSaperow" : 5
//"saperDalekowidz"  : "true"
//
//Napisz pojedynczą instrukcję "if" gdzie od razu
//- zmniejszasz liczbę min o 1 
//- zmniejszasz liczbę saperów o 1 
//jeśli saper jest dalekowidzem.

var correctJsResult = "liczbaMin: 9<br>liczbaSaperow: 4";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var liczbaMin = 10;
    var liczbaSaperow = 5;
    var saperDalekowidz = true;
    
    if (saperDalekowidz) {
        liczbaMin--;
        liczbaSaperow--;
    }

    // 
// -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return "liczbaMin: " + liczbaMin + "<br>" + "liczbaSaperow: " + liczbaSaperow;
}
