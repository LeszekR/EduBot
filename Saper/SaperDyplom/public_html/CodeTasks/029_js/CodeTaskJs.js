
// CODE TASK dla JAVA SCRIPT   029
// 
//Utworz zmienną "ryzykoMin";
//
//Utwórz funkcję "ocenRyzyko", która przyjmuje 1 argument : "sprytWroga".
//Wewnątrz funkcji przypisz zmiennej "ryzykoMin" wartość jako argumentu "sprytWroga" pomnożoną przez 2.

var correctJsResult = "Gdy wróg jest sprytny na 3, to ryzyko min wynosi: 6";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var ryzykoMin;
    
    function ocenRyzyko(sprytWroga) {
        ryzykoMin = sprytWroga * 2;
    }

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
ocenRyzyko(3);
return "Gdy wróg jest sprytny na 3, to ryzyko min wynosi: " + ryzykoMin;
}
