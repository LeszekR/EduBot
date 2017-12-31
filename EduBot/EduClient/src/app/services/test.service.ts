import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { ClosedQuestion } from '../models/quiz-model/closed-question';
import { QuizTaskDTO } from '../models/quiz-model/test-task-DTO';
import { TestTaskAnswDTO } from '../models/quiz-model/test-task-answ-DTO';

// Components
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';
import { TestType } from '../models/quiz-model/enum-test-type';
import { CodeTask } from '../models/quiz-model/code-task';


// ==================================================================================================================
@Injectable()
export class TestTaskService {

    private moduleUrl = 'http://localhost:64365/api/testquestion';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    verifyClosedTest(answers: TestTaskAnswDTO[]): Observable<TestTaskAnswDTO[]> {
        return this.http.post<TestTaskAnswDTO[]>(
            this.moduleUrl + '/verifyclosedtest', answers);
    }

    // --------------------------------------------------------------------------------------------------------------
    public StringifyQuizTasks(testTasks: any[], moduleId: number, type: TestType)
        : QuizTaskDTO[] {

        if (testTasks == undefined)
            return null;
        if (testTasks.length == 0)
            return null;


        let testTaskArr: QuizTaskDTO[] = [];
        let q: ClosedQuestion;
        let c: CodeTask;
        let qDTO: QuizTaskDTO;
        let answersStr: string;

        for (var i in testTasks) {
            qDTO = new QuizTaskDTO();


            // CLOSED QUESTION ........................................
            if (type == TestType.Choice) {

                q = testTasks[i];

                answersStr = "";
                for (var j in q.answers)
                    answersStr += "*" + q.answers[j];
                answersStr = answersStr.substr(1);

                qDTO.question_answer = q.question + "^" + q.correct_idx + "^" + answersStr;
            }

            // CODE TASK ..............................................
            else if (type == TestType.Code) {
                c = testTasks[i];
                qDTO.question_answer = c.question + "^" + c.correct_result + "^" + c.executor_code;
            }

            // BOTH  ...................................................
            qDTO.id = q.id;
            qDTO.position = +i;
            qDTO.module_id = moduleId;

            testTaskArr[testTaskArr.length] = qDTO;
        }

        return testTaskArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    public UnpackQuizTasks(quizTasks: QuizTaskDTO[]): any {

        if (quizTasks == undefined || quizTasks == null)
            return;


        let questionsArr: ClosedQuestion[] = [];
        let codeTasksArr: CodeTask[] = [];
        let q: ClosedQuestion;
        let c: CodeTask;
        let elements: string[];

        for (var i in quizTasks) {

            elements = quizTasks[i].question_answer.split("^");

            // CLOSED QUESTION ........................................
            if (quizTasks[i].test_type == TestType.Choice) {
                q = new ClosedQuestion();
                q.answers = elements[2].split("*");
                questionsArr[questionsArr.length] = q;
            }

            // CODE TASK ..............................................
            else if (quizTasks[i].test_type == TestType.Code) {
                c = new CodeTask();
                c.correct_result = elements[1];
                c.executor_code = elements[2];
                codeTasksArr[codeTasksArr.length] = c;
            }

            codeTasksArr[codeTasksArr.length - 1].id = quizTasks[i].id;
            codeTasksArr[codeTasksArr.length - 1].question = elements[0];
        }


        return {
            questions: questionsArr, 
            codeTasks: codeTasksArr};
    }
}