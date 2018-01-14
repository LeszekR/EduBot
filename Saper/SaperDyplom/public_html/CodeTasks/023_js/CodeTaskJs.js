
// CODE TASK dla JAVA SCRIPT   023
// 
//Utwórz zmienne i przypisz im wartości
//"oszczednosci" : 100
//"procent" : 1.05
//"liczbaLat" : 20
//
//Utwórz pętlę "for", która :
//- wykona się tyle razy ile wynosi liczba lat,
//- w każdym obrocie oszczędności zostaną pomnożone przez procent.

var correctJsResult = 265;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var oszczednosci = 100;
    var procent = 1.05;
    var liczbaLat = 20;
    
    for (var i = 0; i < liczbaLat; i++)
        oszczednosci *= procent;

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return Math.round(oszczednosci);
}
