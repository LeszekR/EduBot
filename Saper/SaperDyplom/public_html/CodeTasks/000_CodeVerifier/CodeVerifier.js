

function verifyCode() {

    var codeMode = document.getElementById('codeMode').innerHTML.trim();
    var correctResult;

    var divCorrectResult = document.getElementById('correctResult');
    var divCodeOutput = document.getElementById('codeOutput');

    var output;
    if (codeMode === 'javascript') {
        correctResult = correctJsResult;
        divCorrectResult.innerHTML = correctResult;
        output = studentJsCode();
        divCodeOutput.innerHTML = output;
    }

    else if (codeMode === 'html') {
        correctResult = correctHtmlResult;
        divCorrectResult.innerHTML = correctResult;

        // biorę surrounding code
        var divSurrounding = document.getElementById('surroundingCode');
        var surroundingCode = divSurrounding.innerHTML.trim();

        // podstawiam kod studenta w surrounding code
        var studentHtmlCode = document.getElementById('codeEditor').innerHTML.trim();
        studentHtmlCode = surroundingCode.replace('// STUDENT_CODE_HERE', studentHtmlCode);

        // wkładam kod studenta do div w którym ma się wyświetlić
        divSurrounding.innerHTML = "";
        divCodeOutput.innerHTML = studentHtmlCode;
        
        // pozyskuję czysty kod studenta
        output = executorCode();
    }

    var result = output == correctResult ? 'Sukces' : 'Wynik nieprawidłowy';
    document.getElementById('result').innerHTML = result;
}
