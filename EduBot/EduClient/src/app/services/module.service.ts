import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { Distractor } from '../models/distractor'
import { ContextService } from './context.service';
import {AppModule} from "../app.module";


// ==================================================================================================================
@Injectable()
export class ModuleService {

    private modulePath = '/api/module';

    moduleAdded = new EventEmitter<Module>();
    refreshModule = new EventEmitter<Module>();
    updateModuleOnList = new EventEmitter<number>();
    // TODO - ZDARZENIA na poprawienie pytania lub kodu na błedne rozwiązanie
    // questionsSolved = new EventEmitter<number>();
    // codeTasksSolved = new EventEmitter<number>();
    editedModuleId: number;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService,
        private context: ContextService) { }


    // PUBLIC
    // ==============================================================================================================
    countEasyModules(): Observable<number> {
        return this.http.get<number>(this.modulePath + '/counteasymodules');
    }

    // --------------------------------------------------------------------------------------------------------------
    fillMetaModules(): Observable<string> {
        return this.http.get<string>(this.modulePath + '/fillmetamodules');
    }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModulesOfUser(): Observable<Module[]> {
        return this.http.get<Module[]>(this.modulePath + '/getsimplemodulesofuser');
    }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModules(): Observable<Module[]> {
        return this.http.get<Module[]>(this.modulePath + '/getsimplemodules');
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleInProperMode(): Observable<Module> {
        if (this.context.isEditMode)
            return this.getModuleByIdEdit(this.context.currentModuleId);
        else
            return this.getModuleByIdLearn(this.context.currentModuleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleByIdEdit(id: number): Observable<Module> {
        return this.http.get<Module>(this.modulePath + '/getmoduleedit/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleByIdLearn(id: number): Observable<Module> {
        return this.http.get<Module>(this.modulePath + '/getmodulelearn/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        return this.http.post<Module>(this.modulePath + '/upsertmodule', module);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveMetaModule(moduleGroup: Module[]): Observable<Module[]> {
        return this.http.post<Module[]>(this.modulePath + '/newmetamodule', moduleGroup);
    }

    // --------------------------------------------------------------------------------------------------------------
    deleteModule(id: number): Observable<Module[]> {
        return this.http.delete<Module[]>(this.modulePath + '/deletemodule/' + id);
    }

    getModuleState(id: number): Observable<Module> {
        return this.http.get<Module>(this.modulePath + '/moduleResults/' + id);
    }
}