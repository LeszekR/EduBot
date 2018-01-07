import { Injectable } from '@angular/core';
import { MessageService } from '../shared/components/message/message.service';

// Model
import { CodeTask } from '../models/quiz-model/code-task';


// ==================================================================================================================
@Injectable()
export class TestCodeService {

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService) { }

    // PUBLIC
    // ==============================================================================================================
    executeCode(codeTask: CodeTask): boolean {

        try {
            codeTask.executor_code = new Function(codeTask.correct_result)();
            console.log(codeTask.id + ' result:', codeTask.executor_code);
        } catch (e) {
            this.messageService.error(e.message, 'common.error');

            return false;
        }
        return false;
    }
}
