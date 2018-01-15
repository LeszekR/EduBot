
// CODE TASK dla JAVA SCRIPT   038
// 
// 
//W twoim kodzie html jest już element div z id : "badGuy".
//W twoim kodzie CSS jest są już klasy "alive" i "killed".
//
//Napisz kod JavaScript, który dodaje do llisty klas elementu "badGuy" klasę "killed".


var correctJsResult = "<style>#badGuy{width:6rem; height 5rem;border: 4px solid black; margin: 2rem;text-align: center;} .alive{background-color: lightgreen;} .killed{background-color: red;}</style><div id=\"badGuy\" class=\"killed\">BAD GUY</div>";

function studentJsCode() {

var codeOutput = document.getElementById("codeOutput");
var badGuy = document.createElement("div");
badGuy.id = "badGuy";
badGuy.innerHTML = "BAD GUY";

var css = document.createElement("style");
css.innerHTML = "#badGuy{width:6rem; height 5rem;border: 4px solid black; margin: 2rem;text-align: center;}"
+" .alive{background-color: lightgreen;} .killed{background-color: red;}";

codeOutput.appendChild(css);
codeOutput.appendChild(badGuy);


    // STUDENT_CODE_HERE
    // -------------------------------------------------------------------------
    document.getElementById("badGuy").classList.add("killed");
    
// -------------------------------------------------------------------------    
// STUDENT_CODE_HERE
return codeOutput.innerHTML;
}
