import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { ClosedQuestion, ClosedQuestionDTO, ClosedQuestionAnswDTO } from '../models/quiz-model/closed-question';
import { CodeTask, CodeTaskDTO } from '../models/quiz-model/code-task';

// Components
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';


// ==================================================================================================================
@Injectable()
export class TestTaskService {

    private moduleUrl = 'http://localhost:64365/api/quiz';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    verifyClosedTest(answers: ClosedQuestionAnswDTO[]): Observable<ClosedQuestionAnswDTO[]> {
        return this.http.post<ClosedQuestionAnswDTO[]>(
            this.moduleUrl + '/verifyclosedtest', answers);
    }

    // --------------------------------------------------------------------------------------------------------------
    public StringifyClosedQuestions(questions: ClosedQuestion[], moduleId: number): ClosedQuestionDTO[] {

        if (questions == undefined)
            return null;
        if (questions.length == 0)
            return null;


        let questionArr: ClosedQuestionDTO[] = [];
        let qDTO: ClosedQuestionDTO;
        let q: ClosedQuestion;
        let answersStr: string;

        for (var i in questions) {

            q = questions[i];
            
            answersStr = "";
            for (var j in q.answers) answersStr += "*" + q.answers[j];
            
            qDTO = new ClosedQuestionDTO();
            qDTO.id = q.id;
            qDTO.module_id = moduleId;
            qDTO.position = +i;
            qDTO.question_answer = q.question + "^" + q.correct_idx + "^" + answersStr.substr(1);

            questionArr[questionArr.length] = qDTO;
        }

        return questionArr;
    }


    // --------------------------------------------------------------------------------------------------------------
    public StringifyCodeTasks(codeTasks: CodeTask[], moduleId: number): CodeTaskDTO[] {

        if (codeTasks == undefined)
            return null;
        if (codeTasks.length == 0)
            return null;


        let codeTaskArr: CodeTaskDTO[] = [];
        let cDTO: CodeTaskDTO;
        let c: CodeTask;

        for (var i in codeTasks) {

            c = codeTasks[i];
            cDTO = new CodeTaskDTO();
            cDTO.id = c.id;
            cDTO.module_id = moduleId;
            cDTO.position = +i;
            cDTO.task_answer = c.question + "^" + c.correct_result + "^" + c.executor_code;

            codeTaskArr[codeTaskArr.length] = cDTO;
        }

        return codeTaskArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    public UnpackClosedQuestions(questions: ClosedQuestionDTO[]): ClosedQuestion[] {

        if (questions.length == 0)
            return;


        let questionsArr: ClosedQuestion[] = [];
        let q: ClosedQuestion;
        let elements: string[];

        for (var i in questions) {

            elements = questions[i].question_answer.split("^");

            q = new ClosedQuestion();
            q.id = questions[i].id;
            q.question = elements[0];
            q.correct_idx = +elements[1];
            q.answers = elements[2].split("*");

            questionsArr[questionsArr.length] = q;
        }
        return questionsArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    public UnpackCodeTasks(codeTasks: CodeTaskDTO[]): CodeTask[] {

        if (codeTasks.length == 0)
            return;


        let codeTasksArr: CodeTask[] = [];
        let c: CodeTask;
        let elements: string[];

        for (var i in codeTasks) {

            elements = codeTasks[i].task_answer.split("^");

            c = new CodeTask();
            c.id = codeTasks[i].id;
            c.question = elements[0];
            c.correct_result = elements[1];
            c.executor_code = elements[2];

            codeTasksArr[codeTasksArr.length] = c;
        }

        return codeTasksArr;
    }
}