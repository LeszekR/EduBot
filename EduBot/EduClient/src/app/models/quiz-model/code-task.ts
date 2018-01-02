import { TestResult } from "./enum-test-result";


// ==================================================================================================================
export class CodeTask {
    
    id: number;
    position: number;
    question: string;
    status: TestResult = TestResult.None;
    correct_result: any;
    executor_code: string;
}

// ==================================================================================================================
export class CodeTaskDTO {
    id: number;
    position: number;
    task_answer: string;
    last_result: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(codeTask: CodeTask) {
        this.id = codeTask.id;
        this.position = codeTask.position;
        this.task_answer = codeTask.question + '^' + codeTask.correct_result + '^' + codeTask.executor_code;
        }
}