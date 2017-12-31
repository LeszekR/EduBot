import { TestResult } from "./enum-test-result";


// ==================================================================================================================
export class ClosedQuestion {

    public id: number;
    public question: string = "";
    public correct_idx: number = -1;
    public answers: string[] = [];
    public status: TestResult = TestResult.None;


    // // CONSTRUCTOR
    // // ==============================================================================================================
    // constructor(
    // ) { 
    //     public id: number;
    //     public question: string = "";
    //     public correct_idx: number = -1;
    //     public answers: string[] = [];
    //     public status: TestResult = TestResult.None;
    // }
}