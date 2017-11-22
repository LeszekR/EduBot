import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { HttpService } from './http.service';
import { HttpClient } from "@angular/common/http";
import { Module } from '../models/module'

import { MockData } from '../mock/test-data'

import { HttpClientModule } from '@angular/common/http/src/module';
// ==================================================================================================================
@Injectable()
export class ModuleService {

    private moduleUrl = 'http://localhost:64365/api/module';

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
}