
// CODE TASK dla JAVA SCRIPT   013
// 
//Utwórz tablicę "planets" zawierającą 4 elementy.
//
//Następnie przypisz jej elementom wartości pod podanymi indeksami:
//"Tatooine"   - indeks 3
//"Naboo"   - indeks 0
//"Hoth"   - indeks 2
//"Alderaan"   - indeks 1

var correctJsResult = 4;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var planets = [4];
    planets[3] = "Tatooine";
    planets[0] = "Naboo";
    planets[2] = "Hoth";
    planets[1] = "Alderaan";

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (typeof planets == undefined)
    return "brak tablicy";
if (planets.length != 4)
    return "zły rozmiar tablicy";

var nCorrectElements = 0;
if (planets[3] === "Tatooine") nCorrectElements++;
if (planets[0] === "Naboo") nCorrectElements++;
if (planets[2] === "Hoth") nCorrectElements++;
if (planets[1] === "Alderaan") nCorrectElements++;
return nCorrectElements;
}
