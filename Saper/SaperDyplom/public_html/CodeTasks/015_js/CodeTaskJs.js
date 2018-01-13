
// CODE TASK dla JAVA SCRIPT   015
// 
//Utwórz tablicę dwuwymiarową "sithSaber".
//Liczebność pierwszego wymiaru: 3, liczebność drugiego: 2.
//
//Wypełnij tablicę podając podając w tablicy pod każdym indeksem głównym jednego Sitha.
//Pod indeksem 0 - jego imię, pod indeksem 1 - długość jego miecza świetlnego.
//
//Wstaw takie dane
//"Darth Vader"  1
//"Darth Maul"  2
//"Snoke"  0
//
//Utwórz zmienną "longestSaber" i przypisz jej wartość najdłuższego miecza 
//świetlnego, pobierając ją z utworzonej tablicy.


var correctJsResult = 2;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var sithSaber = [3];
    sithSaber[0] = [2];
    sithSaber[1] = [2];
    sithSaber[2] = [2];
    
    sithSaber[0][0] = "Darth Vader";
    sithSaber[0][1] = 1;

    sithSaber[1][0] = "Darth Maul";
    sithSaber[1][1] = 2;

    sithSaber[2][0] = "Snoke";
    sithSaber[2][1] = 0;
    
    var longestSaber = sithSaber[1][1];
    
    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (sithSaber == undefined)
    return "brak tablicy";
if (sithSaber.length != 3 || sithSaber[0].length != 2)
    return "zły rozmiar tablicy";

return longestSaber;
}
