// CODE TASK dla JAVA SCRIPT   012
// 
//Utwórz zmienną i przypisz jej string zawierający liczby 90, 60, 90 oddzielone znakami "x".
//Oprócz liczb i znaków "x" nie może w nim być żadnych spacji ani innych znaków.
//
//Utwórz zmienną "wymiary" i przypisz do niej tablicę tworząc ją z twojej zmiennej.
//Dla utworzenia tablicy użyj funkcji "split" dzieląc string znakiem "x".

var correctJsResult = 240;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var zrodlo = "90x60x90";
    var wymiary = zrodlo.split("x");

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (typeof wymiary == undefined)
    return "brak tablicy";
if (wymiary.length != 3)
    return "zły rozmiar tablicy";

var total = 0;
total += Number(wymiary[0]);
total += Number(wymiary[1]);
total += Number(wymiary[2]);
return total;
}
