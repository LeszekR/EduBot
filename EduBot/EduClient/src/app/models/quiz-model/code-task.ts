import { TestResult } from './enum-test-result'


// ==================================================================================================================
export class CodeTask {

    id: number;
    question: string;
    correct_result: any;
    executor_code: string;
    status: TestResult;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.question = "";
        this.correct_result = "";
        this.executor_code = "";
        this.status = TestResult.None;
    }
}