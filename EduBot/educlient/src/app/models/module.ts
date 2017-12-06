//Models
import { TestType } from './enum-test-type';
import { DiffLevel } from './enum-diff-level';

import { ClosedQuestionDTO } from './closed-question-DTO';


// ==================================================================================================================
export class Module {

    id: number;
    group_id: number;
    group_position: number;
    difficulty: string;
    title: string;
    content: string;
    example: string;
    test_question: ClosedQuestionDTO[];

    isSelected: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.id = 0;    
        this.group_position = 0;
        this.difficulty = "easy";
        this.title = "<podaj tytuł>";
        this.content = "";
        this.example = "";
    }
}