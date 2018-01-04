import { TestResult } from "./enum-test-result";


// ==================================================================================================================
export class CodeTask {
    
    id: number;
    position: number;
    question: string;
    status: TestResult = TestResult.None;
    exec_output: string;
    executor_code: string;
}

// ==================================================================================================================
export class CodeTaskDTO {
    id: number;
    position: number;
    module_id: number;
    task_answer: string;
    last_result: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(codeTask: CodeTask) {
        this.id = codeTask.id;
        this.position = codeTask.position;
        this.task_answer = codeTask.question + '^' + codeTask.exec_output + '^' + codeTask.executor_code;
        }
}


// ==================================================================================================================
export class CodeTaskAnswDTO {   
    codeTaskId: number;
    answer: string;
    lastResult: boolean;

  // CONSTRUCTOR
  // ==============================================================================================================
    constructor(codeTaskId: number, answer: string, lastResult: boolean) {
        this.codeTaskId = codeTaskId;
        this.answer = answer;
        this.lastResult = lastResult;
    }
}