import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { Distractor } from '../models/distractor'


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
    // CreateModuleSequence() {
    //     this.http.get<string>(this.moduleUrl + '/createmodulesequence')
    //         .subscribe(res => console.log(res));
    // }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModulesOfUser(): Observable<Module[]> {
        return this.http.get<Module[]>(this.moduleUrl + '/getsimplemodulesofuser');
    }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModules(): Observable<Module[]> {
        return this.http.get<Module[]>(this.moduleUrl + '/getsimplemodules');
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleByIdEdit(id: number): Observable<Module> {
        return this.http.get<Module>(this.moduleUrl + '/getmoduleedit/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleByIdLearn(id: number): Observable<Module> {
        return this.http.get<Module>(this.moduleUrl + '/getmodulelearn/' + id);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        return this.http.post<Module>(this.moduleUrl + '/upsertmodule', module);
    }

    // --------------------------------------------------------------------------------------------------------------
    saveMetaModule(moduleGroup: Module[]): Observable<Module[]> {
        return this.http.post<Module[]>(this.moduleUrl + '/newmetamodule', moduleGroup);
    }

    // --------------------------------------------------------------------------------------------------------------
    deleteModule(id: number): Observable<Module[]> {
        return this.http.delete<Module[]>(this.moduleUrl + '/deletemodule/' + id);
    }
}