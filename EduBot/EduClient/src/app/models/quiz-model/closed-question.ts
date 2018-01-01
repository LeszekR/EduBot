import { TestResult } from "./enum-test-result";

// ==================================================================================================================
export class ClosedQuestion {
    id: number;
    question: string = "";
    status: TestResult = TestResult.None;
    correct_idx: number = -1;
    answers: string[] = [];
}


// ==================================================================================================================
export class ClosedQuestionDTO {
    id: number;
    position: number;
    module_id: number;
    question_answer: string;
    last_result: boolean;
}


// ==================================================================================================================
export class ClosedQuestionAnswDTO {   
    question_id: number;
    answer_id: number;

  // CONSTRUCTOR
  // ==============================================================================================================
    constructor(questionId: number, answerId: number) {
        this.question_id = questionId;
        this.answer_id = answerId;
    }
}