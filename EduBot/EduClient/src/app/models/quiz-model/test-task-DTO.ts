import { TestType } from "./enum-test-type";

// ==================================================================================================================
export class QuizTaskDTO {

    public id: number;
    public position: number;
    public module_id: number;
    public question_answer: string;
    public last_result: boolean
    public test_type: TestType;
}