import { Injectable } from '@angular/core';

// Model
import { CodeTaskFront } from '../models/code-task';
import { CodeMode } from '../models/enums';


// ==================================================================================================================
@Injectable()
export class TestCodeService {

    readonly STUDENT_CODE = '// STUDENT_CODE_HERE';


    // PUBLIC
    // ==============================================================================================================
    /*
    * UWAGA: niektóre zadania nie wymagają kodu do wykonania przed oraz/lub po kodzie studenta
    * - wówczas surroundingCode jest pustym stringiem.
    * Inne zadania wymagają wykonania czegoś przed lub po kodzie studenta
    * - wówczas surroundingCode zawiera kod w którym gdzieś  znajduje się
    * string: '// STUDENT_CODE_GOES_HERE' - za który podstawiamy kod studenta przed wykonaniem.
    *
    * UWAGA: aby zweryfikować kod w trybie HTML obowiązkowe jest podanie executorCode.
    * - jako funkcję, która pobiera 1 argument - tym argumentem jest poddrzewo DOM utworzone
    * przez kod studenta (ew. umieszczony wewnątrz surroundingCode). Zadaniem executorCode
    * jest porównanie struktury i atrybutów poddrzewa DOM utworzonego w div'ie jako rezultat
    * wykonania kodu studenta z correctResult.
    *
    *
    * Wykonanie kodu studenta:
    *
    * 1. kod studenta (studentCode) wstawiamy do kodu otaczającego
    *
    * ACE MODE: javascript
    * 2. wstawiamy ten kod do funkcji, wykonujemy i otrzymujemy wynik
    * 3. wyświetlamy wynik na ekranie
    *
    * ACE MODE: html
    * 2. przeglądarka wykonuje html i wstawia na ekran
    * 3. wykonujemy kod sprawdzający wynik (executorCode) na zawartości div'a w oknie wyświetlającym
    *    efekt działania kodu - otrzymujemy wynik
    *
    * 4. porównujemy wynik do prawidłowego (correctResult) i zwracamy wynik tego porównania
    */
    executeCode(codeTask: CodeTaskFront): boolean {

        let result: string;
        const iframe = document.getElementById('codeOutput');
        const scopedDocument = (iframe as HTMLIFrameElement).contentDocument;
        scopedDocument.head.innerHTML = '';
        scopedDocument.body.innerHTML = '';
        const script = scopedDocument.createElement('script');


        // Insert student's code into its surrounding code
        let codeToExecute = '';
        if (codeTask.surroundingCode !== '') {
            codeToExecute = codeTask.surroundingCode
                .replace(this.STUDENT_CODE, codeTask.studentCode);
        } else {
            codeToExecute = codeTask.studentCode;
        }

        // The code is pure JavaScript
        if (codeTask.codeMode === CodeMode.JAVASCRIPT) {
            try {
                new Function(codeTask.studentCode);
            } catch(e) {
                this.handleException(scopedDocument, e);
                return false;
            }
            script.innerHTML += 'codeToExecuteFunction = () => {' + codeToExecute + '\n}';
        } else if (codeTask.codeMode === CodeMode.HTML) { // The code is HTML + CSS + JavaScript
            scopedDocument.write(codeToExecute);
            script.innerHTML += 'codeToExecuteFunction = () => {' + codeTask.executorCode + '\n}';
        } else {
            console.log('Nie rozpoznany codeMode w codeTaskFront');
            return false;
        }
        this.defaultStyling(scopedDocument);
        ((iframe as HTMLIFrameElement).contentWindow as any).studentCode = codeTask.studentCode;
        scopedDocument.head.appendChild(script);

        try {
            result = ((iframe as HTMLIFrameElement).contentWindow as any).codeToExecuteFunction();
            if (codeTask.codeMode === CodeMode.JAVASCRIPT) {
                scopedDocument.body.innerHTML = result;
            }

            // return the decision as to whether the code produces correct result
            return result == codeTask.correctResult;

        } catch (e) {
            this.handleException(scopedDocument, e);
            return false;
        }
    }

    private handleException(scopedDocument, e): void {
        let message = '';
        if (e.message.includes('iframe.contentWindow.codeToExecuteFunction')) {
            message = 'Twój kod jest błędny!';
        } else {
            message = e.message;
        }
        scopedDocument.body = document.createElement('body');
        scopedDocument.body.innerHTML = '<span style="color:red;">' + message + '</span>';
    }

    private defaultStyling(scopedDocument): void {
        let style = scopedDocument.createElement('style');
        style.innerHTML = 'html {' +
            'margin-top: -8px;' +
            '}' +
            'body {' +
            'font: 12px/normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;' +
            'font-size: 1.1rem;' +
            '}'
        scopedDocument.head.appendChild(style);
    }
};
