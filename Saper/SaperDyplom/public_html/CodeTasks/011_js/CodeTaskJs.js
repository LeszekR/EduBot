
// CODE TASK dla JAVA SCRIPT   011
// 
//Utwórz tablicę "weapons" zawierającą takie elementy:
//"light saber"
//"laserGun"
//"crossBow"
//
//Zastosuj dowolną metodę tworzenia tablicy.

var correctJsResult = 3;

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var weapons = [
            "light saber",
            "laser gun",
            "crossbow"
    ];
// -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (typeof weapons == undefined)
    return "brak tablicy";
if (weapons.length != 3)
    return "zły rozmiar tablicy";

var nCorrectElements = 0;
if (weapons.indexOf("light saber") > -1) nCorrectElements++;
if (weapons.indexOf("laser gun") > -1) nCorrectElements++;
if (weapons.indexOf("crossbow") > -1) nCorrectElements++;
return nCorrectElements;
}
