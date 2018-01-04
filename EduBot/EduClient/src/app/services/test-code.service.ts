import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { CodeTask, CodeTaskDTO } from '../models/quiz-model/code-task';

// Components


// ==================================================================================================================
@Injectable()
export class TestCodeService {


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    executeCode(codeTask: CodeTask): boolean {

        // TODO: wykonać kod studenta, zwrócić true | false zaleznie od prawidłowości wyniku

        // MOCK ***************************************************
        console.log("verifyCodeTest(): " + codeTask.exec_output);
        // ********************************************************

        return false;
    }
}