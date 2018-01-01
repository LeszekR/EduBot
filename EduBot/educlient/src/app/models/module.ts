//Models
import { DiffLevel } from './enum-diff-level';
import { ClosedQuestionDTO } from './quiz-model/closed-question';
import { CodeTaskDTO } from './quiz-model/code-task';


// ==================================================================================================================
export class Module {

    id: number;
    group_id: number;
    group_position: number;
    difficulty: string;
    title: string;
    content: string;
    example: string;
    test_questions_DTO: ClosedQuestionDTO[];
    test_codes_DTO: CodeTaskDTO[];

    solvedQuestions: boolean;
    solvedCodes: boolean;
    
    isSelected: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.difficulty = "easy";
        this.title = "<podaj tytuł>";
        this.content = "";
    }
}