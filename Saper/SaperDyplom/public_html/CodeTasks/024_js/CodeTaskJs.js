
// CODE TASK dla JAVA SCRIPT   024
// 
//Utwórz zmienne i przypisz im wartości
//"rozbrojoneMiny" : tablica 4-elementowa 
//"poleMinowe" : 13
//"liczbaGodzin" : 4
//
//Kolejnym elementom tablicy przypisz liczby : 2, 4, 1, 6
//
//Utwórz pętlę "for", która :
//- wykona się tyle razy ile wynosi liczba godzin,
//- w każdym obrocie pole minowe zmniejszy się o tyle min, ile jest 
//w tablicy "rozbrojoneMiny" pod indeksem wskazanym przez iterator pętli.


var correctJsResult = 0;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var rozbrojoneMiny = [4];
    var poleMinowe = 13;
    var liczbaGodzin = 4;
    
    rozbrojoneMiny = [2,4,1,6];

    for (var i = 0; i < liczbaGodzin; i++)
        poleMinowe -= rozbrojoneMiny[i];

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return poleMinowe;
}
