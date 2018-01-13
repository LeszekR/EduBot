
// CODE TASK dla JAVA SCRIPT   016
// 
//1. Utwórz element "div"
//2. Wstaw do niego drugi element "div"

var correctHtmlResult = "<div><div></div></div>";

function executorCode() {

var studentHtml = document.getElementById("studentHtml").innerHTML;
return studentHtml.replace(/\r\n|\r|\n|\t| /g, "");

}
