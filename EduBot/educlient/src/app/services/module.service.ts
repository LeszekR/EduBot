import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

//Services
import { HttpClientModule } from '@angular/common/http/src/module';
import { HttpClient } from "@angular/common/http";
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { ClosedQuestion } from '../models/closed-question';
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';

// import { MockData } from '../mock/test-data'


// ==================================================================================================================
@Injectable()
export class ModuleService {

    private moduleUrl = 'http://localhost:64365/api/module';

    moduleAdded = new EventEmitter<Module>();
    editedModuleId: number;

    modules: Module[] = [];


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    public StringifyClosedQuestions(quizView: QuizViewComponent): string {

        if (quizView == undefined)
            return '';
        // if (quizView.questions == undefined)
        //     return '';
        // if (quizView.questions.length == 0)
        //     return '';

        let questionsStr = "";

        let q: ClosedQuestion;
        let answersStr: string;

        for (var i in quizView.questions) {
            q = quizView.questions[i];

            answersStr = "";
            for (var j in q.answers)
                answersStr += "*" + q.question;
            answersStr = answersStr.substr(1);

            questionsStr += "#" + q.question;
            questionsStr += "^" + q.correct_idx;
            questionsStr += "^" + answersStr;
        }

        return questionsStr.substr(1);
    }

    // --------------------------------------------------------------------------------------------------------------
    public UnpackClosedQuestions(questionsStr: string): ClosedQuestion[] {

        if (questionsStr == undefined || '')
            return;


        let questionsArr: ClosedQuestion[] = [];
        let q: ClosedQuestion;

        let questionsStrings: string[];
        let elements: string[];

        questionsStrings = questionsStr.split("#");

        for (var i in questionsStrings) {
            elements = questionsStrings[i].split("^");

            q = new ClosedQuestion();
            q.question = elements[0];
            q.correct_idx = Number(elements[1]);
            q.answers = elements[2].split("*");

            questionsArr[questionsArr.length] = q;
        }
        return questionsArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModules(): Observable<Module[]> {
        return this.http.get<Module[]>(this.moduleUrl + '/getsimplemodules');
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleById(id: number): Observable<Module> {
        return this.http.get<Module>(this.moduleUrl + '/getmodule/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        return this.http.post<Module>(this.moduleUrl + '/upsertmodule', module);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveMetaModule(moduleGroup: Module[]): Observable<Module> {
        return this.http.post<Module>(this.moduleUrl + '/newmetamodule', moduleGroup);
    }

    // --------------------------------------------------------------------------------------------------------------
    deleteModule(id: string): Observable<Module[]> {
        // return this.http.delete<Module[]>(this.moduleUrl + '/deletemodule', id);
        return this.http.delete<Module[]>(this.moduleUrl + '/deletemodule/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    nextModule(): Observable<string> {
        // TODO: zdecydować jak przysyłać kolejny moduł - tylko id, czy cały, czy wiele modułów
        return this.http.get<string>(this.moduleUrl + '/getnextmodule');
    }
}