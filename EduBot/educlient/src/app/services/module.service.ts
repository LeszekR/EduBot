import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

//Services
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { Distractor } from '../models/distractor'
import { ModulDistracDTO } from '../models/module-and-distractor-DTO'

// Components
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';


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
    explainModule(moduleId: number): Observable<Module[]> {
        return this.http.get<Module[]>(this.moduleUrl + '/explainmodule/' + moduleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    CreateModuleSequence() {
        this.http.get<string>(this.moduleUrl + '/createmodulesequence')
            .subscribe(res => console.log(res));
    }

    // --------------------------------------------------------------------------------------------------------------
    prevModule(currentModuleId: number): Observable<ModulDistracDTO> {
        return this.http.get<ModulDistracDTO>(this.moduleUrl + '/getprevmodule/' + currentModuleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    nextModule(currentModuleId: number): Observable<ModulDistracDTO> {
        let moduleId = currentModuleId == undefined ? 0 : currentModuleId;
        return this.http.get<ModulDistracDTO>(this.moduleUrl + '/getnextmodule/' + moduleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModulesOfUser(): Observable<Module[]> {
        return this.http.get<Module[]>(this.moduleUrl + '/getsimplemodulesofuser');
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
    deleteModule(id: number): Observable<Module[]> {
        return this.http.delete<Module[]>(this.moduleUrl + '/deletemodule/' + id);
    }
}