
// CODE TASK dla JAVA SCRIPT   039
// 
//W twoim kodzie są już :
//-  div z id "badGuy",
//- funkcja "badGuyStrikes()".
//
//Dodaj do div "badGuy" akcję "badGuyStrikes()".
//
//Jeśli masz mocne nerwy - możesz kliknąć.

var correctJsResult = "<style>#badGuy{width:6rem; height 5rem;border: 4px solid black; margin: 2rem;text-align: center;} .alive{background-color: lightgreen;} .killed{background-color: red;}</style><div id=\"badGuy\" class=\"killed\">BAD GUY</div>";

function studentJsCode() {

var codeOutput = document.getElementById("codeOutput");

var badGuy = document.createElement("div");
badGuy.id = "badGuy";
badGuy.innerHTML = "BAD GUY";
badGuy.style = "#badGuy{width:6rem; height 5rem;border: 4px solid black; margin: 2rem;text-align: center;background-color: lightgreen;text-align: center;}";
codeOutput.appendChild(badGuy);

var badAction = document.createElement("div");
badAction.id = "badAction";
badAction.style = "#badAction{width: 100%: min-height: 7rem;padding: 2rem;}";

function badGuyStrikes() {
badAction.innerHTML = "<br>PRZERWA! ZARA WRACAM!"
+"<br>w głowach im się poprzewracało, klikajo i klikajo!"
+"<br>a ty człowieku czyń zło i czyń zło i tak w kółko"
+"<br>czuje się wypalony :("
+"<br>chce na urlop!!";
}


//var css = document.createElement("style");
//codeOutput.appendChild(css);


    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    document.getElementById("badGuy").addEventListener("click", badGuyStrikes);
    
// -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return codeOutput.innerHTML;
}
