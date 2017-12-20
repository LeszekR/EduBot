import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

//Services
// import { HttpClientModule } from '@angular/common/http/src/module';
// import { HttpClient } from "@angular/common/http";
import { HttpService } from './http.service';

// Model
// import { Module } from '../models/module'
import { ClosedQuestion } from '../models/closed-question';
import { ClosedQuestionDTO } from '../models/closed-question-DTO';
import { ClosedQuestAnswDTO } from '../models/closed-question-answ-DTO';

// Components
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';


// ==================================================================================================================
@Injectable()
export class TestQuestionService {

    private moduleUrl = 'http://localhost:64365/api/testquestion';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    verifyClosedTest(answers: ClosedQuestAnswDTO[]): Observable<ClosedQuestAnswDTO[]> {
        return this.http.post<ClosedQuestAnswDTO[]>(
            this.moduleUrl + '/verifyclosedtest', answers);
    }

    // --------------------------------------------------------------------------------------------------------------
    public StringifyClosedQuestions(questions: ClosedQuestion[], moduleId: number): ClosedQuestionDTO[] {

        if (questions == undefined)
            return null;
        if (questions.length == 0)
            return null;


        let questionsArr: ClosedQuestionDTO[] = [];
        let q: ClosedQuestion;
        let qDTO: ClosedQuestionDTO;
        let answersStr: string;

        for (var i in questions) {
            q = questions[i];
            qDTO = new ClosedQuestionDTO();

            answersStr = "";
            for (var j in q.answers)
                answersStr += "*" + q.answers[j];
            answersStr = answersStr.substr(1);

            qDTO.id = q.id;
            qDTO.position = +i;
            qDTO.module_id = moduleId;
            qDTO.question_answer = q.question + "^" + q.correct_idx + "^" + answersStr;

            questionsArr[questionsArr.length] = qDTO;
        }

        return questionsArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    public UnpackClosedQuestions(questions: ClosedQuestionDTO[]): ClosedQuestion[] {

        if (questions == undefined || questions == null)
            return;


        let questionsArr: ClosedQuestion[] = [];
        let q: ClosedQuestion;
        let elements: string[];

        for (var i in questions) {
            elements = questions[i].question_answer.split("^");

            q = new ClosedQuestion();
            q.id = questions[i].id;
            q.question = elements[0];
            q.correct_idx = Number(elements[1]);
            q.answers = elements[2].split("*");

            questionsArr[questionsArr.length] = q;
        }
        return questionsArr;
    }
}