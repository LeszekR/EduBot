//Models
import { TestType } from './quiz-model/enum-test-type';
import { DiffLevel } from './enum-diff-level';

import { QuizTaskDTO } from './quiz-model/test-task-DTO';
import { CodeTask } from '../services/code-task';
import { ClosedQuestion } from './quiz-model/closed-question';


// ==================================================================================================================
export class Module {

    id: number;
    group_id: number;
    group_position: number;
    difficulty: string;
    title: string;
    content: string;
    example: string;
    test_question: ClosedQuestion[];
    test_code: CodeTask[];

    solvedQuestions: boolean;
    solvedCode: boolean;
    
    isSelected: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.difficulty = "easy";
        this.title = "<podaj tytuł>";
        this.content = "";
    }
}