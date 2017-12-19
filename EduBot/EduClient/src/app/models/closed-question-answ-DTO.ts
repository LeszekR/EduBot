// ==================================================================================================================
export class ClosedQuestAnswDTO {

    question_id: number;
    answer_id: number;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(questionId: number, answerId: number) {
        this.question_id = questionId;
        this.answer_id = answerId;
    }
}