import { Injectable } from '@angular/core';
import { MessageService } from '../shared/components/message/message.service';

// Model
import { CodeTaskFront } from '../models/code-task';
import { CodeMode } from '../models/enums';
import { ContextService } from './context.service';


// ==================================================================================================================
@Injectable()
export class TestCodeService {

    readonly STUDENT_CODE = "// STUDENT_CODE_GOES_HERE";


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService,
        private context: ContextService) { }


    // PUBLIC
    // ==============================================================================================================
    /* 
    * UWAGA: niektóre zadania nie wymagają kodu do wykonania przed oraz/lub po kodzie studenta 
    * - wówczas surroundingCode jest pustym stringiem.
    * Inne zadania wymagają wykonania czegoś przed lub po kodzie studenta
    * - wówczas surroundingCode zawiera kod w którym w 1 miejscu znajduje się 
    * string: '// STUDENT_CODE_GOES_HERE' - za który podstawiamy kod studenta przed wykonaniem.
    * 
    * UWAGA: aby zweryfikować kod w trybie HTML obowiązkowe jest podanie executorCode.
    * - jako funkcję, która pobiera 1 argument - tym argumentem jest poddrzewo DOM utworzone
    * przez kod studenta (ew. umieszczony wewnątrz surroundingCode). Zadaniem executorCode
    * jest porównanie struktury i atrybutów poddrzewa DOM utworzonego w div'ie z rezultatem 
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

        try {
            let result: string;


            // Insert student's code into its surrounding code
            let codeToExecute = '';
            if (codeTask.surroundingCode != '')
                codeToExecute = codeTask.surroundingCode
                    .replace(this.STUDENT_CODE, codeTask.studentCode);
            else
                codeToExecute = codeTask.studentCode;


            // The code is pure JavaScript
            if (codeTask.codeMode === CodeMode.JAVASCRIPT) {
                result = new Function(codeToExecute)();
                // console.log(codeTask.id + ' result:', result);
            }

            // The code is HTML + CSS + JavaScript
            else if (codeTask.codeMode === CodeMode.HTML) {
                let outputDiv = this.context.codeOutputDiv;
                outputDiv.innerHTML = codeToExecute;
                result = new Function(codeTask.executorCode, outputDiv.innerHTML)();
            }

            else {
                console.log("Nie rozpoznany codeMode w codeTaskFront");
                return false;
            }


            // return the decision as to whether the code produces correct result
            return result == codeTask.correctResult;

        } catch (e) {
            this.messageService.error(e.message, 'common.error');
            return false;
        }
    }
};
