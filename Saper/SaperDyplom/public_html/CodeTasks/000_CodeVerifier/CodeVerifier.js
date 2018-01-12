

function verifyCode() {

    var codeMode = document.getElementById('codeMode').innerHTML.trim();
    var correctResult;
    
    var divCorrectResult = document.getElementById('correctResult');
    var divSurrCode = document.getElementById('surroundingCode');
    
    var output;
    if (codeMode === 'javascript') {
        correctResult = correctJsResult;
        divCorrectResult.innerHTML = correctResult;
        output = studentJsCode();
        divSurrCode.innerHTML = output;
    }

    else if (codeMode === 'html') {
        correctResult = document.getElementById('correctResult').innerHTML.trim();

        var surroundingCode = document.getElementById('surroundingCode').innerHTML.trim();
        var studentHtmlCode = divSurrCode.innerHTML.trim();
        studentHtmlCode = surroundingCode.replace('// STUDENT_CODE_HERE', studentHtmlCode).trim();

        document.getElementById('codeOutput').innerHTML = studentHtmlCode;
        studentJsCode();

        var executorCode = document.getElementById('executorCode').innerHTML;
        output = new Function(executorCode)();
    }

    var result = output == correctResult ? 'Sukces' : 'Wynik nieprawidłowy';
    document.getElementById('result').innerHTML = result;
}
