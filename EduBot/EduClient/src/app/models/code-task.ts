import { TestResult, CodeMode } from './enums';


// ==================================================================================================================
// The front's internal class.
// It is instantiated BEFORE using the code task contents in the front.
// It is employed by the front in all places where code task i being SHOWN and EXECUTED.
// ------------------------------------------------------------------------------------------------------------------
export class CodeTaskFront {

    // Mirror of the server's TestCodeDTO fields
    id: number;
    position: number;
    module_id: number;
    task_answer: string;
    last_result: boolean;

    // Server's TestCodeDTO remaining field (task_answer) dismantled into separate fields
    question: string;
    surroundingCode: string;
    executorCode: string;
    codeMode: CodeMode;
    correctResult: string;
    // correctResultType: string;
    studentCode: string;
}


// ==================================================================================================================
// Mirror of the server's TestCodeDTO class.
// It is only used by front to SEND AND RECEIVE tasks FROM THE SERVER.
// It is NOT used in front components and services.
// ------------------------------------------------------------------------------------------------------------------
export class CodeTaskDTO {
    id: number;
    position: number;
    module_id: number;
    task_answer: string;
    last_result: boolean;
}


// ==================================================================================================================
// Mirror of the server's TestCodeAnswDTO class.
// Its sole purpose is to carry students task solution and result to the server.
// ------------------------------------------------------------------------------------------------------------------
export class CodeTaskAnswDTO {
    codeTaskId: number;
    answer: string;
    lastResult: boolean;

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(codeTask: CodeTaskFront, lastResult: boolean) {
        this.codeTaskId = codeTask.id;
        this.answer = codeTask.studentCode;
        this.lastResult = lastResult;
    }
}
