import { TestResult } from "./enum-test-result";


// ==================================================================================================================
export class CodeTask {
    
    id: number;
    question: string;
    status: TestResult = TestResult.None;
    correct_result: any;
    executor_code: string;
}

// ==================================================================================================================
export class CodeTaskDTO {
    id: number;
    position: number;
    module_id: number;
    task_answer: string;
    last_result: boolean;
}