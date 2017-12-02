
// ==================================================================================================================
export class ClosedQuestion {

    question: string;
    correct_idx: number;
    answers: string[];


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.question = "";
        this.correct_idx = -1;
        this.answers = [];
    }
}