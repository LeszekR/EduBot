import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

//Services
import { HttpClientModule } from '@angular/common/http/src/module';
import { HttpClient } from "@angular/common/http";
import { HttpService } from './http.service';
import { Module } from '../models/module'

import { MockData } from '../mock/test-data'

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