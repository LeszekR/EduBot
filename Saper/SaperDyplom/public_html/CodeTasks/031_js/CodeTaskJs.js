
// CODE TASK dla JAVA SCRIPT   031
// 
//Utwórz funkcję "drwalWLesie" pobierającą 2 argumenty:
//"czasPracy",
//"kielbasoGodzina".
//
//Funkcja ma zwracać iloczyn 3 liczb :
//"czasPracy"
//"kielbasoGodzina" 
//i liczby 1.5;


var correctJsResult = "Drwal, który zjada 2 kiełbasy na godzinę<br>zjadł w ciągu 8 godzin pracy 24 kiełbasy,<br>ponieważ praca była ciężka.";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    function drwalWLesie(czasPracy, kielbasoGodzina) {
        return czasPracy * kielbasoGodzina * 1.5;
    }

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return "Drwal, który zjada 2 kiełbasy na godzinę<br>"
+ "zjadł w ciągu 8 godzin pracy " + drwalWLesie(8, 2) + " kiełbasy,<br>"
+ "ponieważ praca była ciężka.";
}
