//Models
import { DiffLevel } from './enums';
import { ClosedQuestionDTO, ClosedQuestion } from './closed-question';
import { CodeTaskDTO, CodeTaskFront } from './code-task';


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

    questions: ClosedQuestion[];
    codeTasks: CodeTaskFront[];

    solvedQuestions: boolean;
    solvedCodes: boolean;
    
    isSelected: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.difficulty = "easy";
        this.title = "<podaj tytuł>";
        this.content = "";
        this.isSelected = false;
    }
}