
// CODE TASK dla JAVA SCRIPT   025
// 
//Utwórz tablice :
//"stopienWojskowy" i wstaw do niej : "szer-kapral-kpt-gen"
//"pojazdSapera" i wstaw do niej : "wielbłąd-koń-czołg-limo"
//
//Utwórz tablicę
//"transport" i wstaw do niej pierwsze dwie tablice.
//
//Utwórz zmienną "pojazdy".
//
//Utwórz pętlę "for", a wniej drugi "for".
//W tej podwójnej pętli stwórz string przyisany do zmiennej "pojazdy" ,
//zbudowany z par "stopień-pojazd" pobierając dane z tablicy "transport'. 
//
//Za każdym elementem dodawaj w pętli znak "-".

var correctJsResult = "szer-wielbłąd-kapral-koń-kpt-czołg-gen-limo-";

function studentJsCode() {

    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    var stopienWojskowy = ["szer", "kapral", "kpt", "gen"];
    var pojazdSapera = ["wielbłąd", "koń", "czołg", "limo"];

    var transport = [stopienWojskowy, pojazdSapera];

    var pojazdy = "";

    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 2; j++)
            pojazdy += transport[j][i] + "-";

    // -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
if (transport == undefined)
    return "brak tablicy";
if (transport.length != 2 || transport[0].length != 4)
    return "zły rozmiar tablicy";

return pojazdy;
}
