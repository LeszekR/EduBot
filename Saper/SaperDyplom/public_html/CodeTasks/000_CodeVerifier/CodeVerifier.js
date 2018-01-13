

function verifyCode() {

    var codeMode = document.getElementById('codeMode').innerHTML.trim();
    var correctResult;
    
    var divCorrectResult = document.getElementById('correctResult');
//    var divSurrCode = document.getElementById('surroundingCode');
    var divCodeOutput = document.getElementById('codeOutput');
    
    var output;
    if (codeMode === 'javascript') {
        correctResult = correctJsResult;
        divCorrectResult.innerHTML = correctResult;
        output = studentJsCode();
        divCodeOutput.innerHTML = output;
    }

    else if (codeMode === 'html') {
        correctResult = document.getElementById('correctResult').innerHTML.trim();

        var surroundingCode = document.getElementById('surroundingCode').innerHTML.trim();
        var studentHtmlCode = document.getElementById('codeEditor').innerHTML.trim();
        studentHtmlCode = surroundingCode.replace('// STUDENT_CODE_HERE', studentHtmlCode);

        divCodeOutput.innerHTML = studentHtmlCode;
        studentJsCode();

        var executorCode = document.getElementById('executorCode').innerHTML;
        output = new Function(executorCode)();
    }

    var result = output == correctResult ? 'Sukces' : 'Wynik nieprawidłowy';
    document.getElementById('result').innerHTML = result;
}
