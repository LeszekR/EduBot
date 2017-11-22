//Models
import { TestType } from './enum-test-type';
import { DiffLevel } from './enum-diff-level';


// ==================================================================================================================
export class Module {

    id: number;
    id_group: number;
    difficulty: string;
    title: string;
    content: string;
    example: string;
    testType: string;
    testTask: string;
    testAnswer: string;
    
    // isNew: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        this.id = 0;    
        this.id_group = 0;
        this.difficulty = "easy";
        this.title = "<podaj tytuł>";
        this.content = "";
        this.example = "";
        this.testType = "";
        this.testTask = "";
        this.testAnswer = "";
        // this.isNew = true;
    }
}