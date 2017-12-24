

export enum QuestionStatus {
    None,
    Correct,
    Incorrect
}
// ==================================================================================================================
export class ClosedQuestion {

    id: number;
    question: string;
    correct_idx: number;
    answers: string[];
    status: QuestionStatus;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.question = "";
        this.correct_idx = -1;
        this.answers = [];
        this.status = QuestionStatus.None;
    }
}