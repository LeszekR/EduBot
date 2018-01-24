
// CODE TASK dla JAVA SCRIPT   014
// 
//Utwórz tablicę dwuwymiarową "iceCream".
//Liczebność pierwszego wymiaru: 2, liczebność drugiego: 4.
//
//Wypelnij tablicę stanowiącą element pod indeksem 0 nazwami Twoich ulubionych lodów. 
//(Użyj stringów).
//
//Wypełnij tablicę stanowiącą element pod indeksem 1 liczbami całkowitymi 
//od 1 do 4, w dowolnej kolejności, tworząc ranking Twoich ulubionych smaków.

var correctJsResult = 10;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var iceCream = [2];
    iceCream[0] = [4];
    iceCream[1] = [4];
    
    iceCream[0][0] = "czeko";
    iceCream[0][1] = "orzech";
    iceCream[0][2] = "mango";
    iceCream[0][3] = "trusk";

    iceCream[1][0] = 1;
    iceCream[1][1] = 2;
    iceCream[1][2] = 4;
    iceCream[1][3] = 3;
    
    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (typeof iceCream == undefined)
    return "brak tablicy";
if (iceCream.length != 2 || iceCream[0].length != 4)
    return "zły rozmiar tablicy";

var total = 0;
iceCream[1].forEach(function(rank) {
    total+=rank;})
return total;
}
