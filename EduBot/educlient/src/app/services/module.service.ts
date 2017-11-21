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
    // mockData: MockData = new MockData();


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService, private httpClient: HttpClient) { }


    // PUBLIC
    // ==============================================================================================================
    getSimpleModules(): Module[] {
        this.httpClient.get<Module[]>(this.moduleUrl + '/getsimplemodules')
            .subscribe(
            newModules => {
                this.modules = newModules;
            },
            err => console.log(err));

        // this.http.getHttp(this.moduleUrl)
        //     .subscribe(
        //     res => this.modules = res[0],
        //     err => console.log(err));

        return this.modules;
        // return this.getSimpleModulesMock();
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleById(id: number): Module {
        let module: Module;
        this.httpClient.get<Module>(this.moduleUrl + '/getmodule/' + id)
            .subscribe(newModule => module = newModule,
            err => console.log(err)
        );
        return module;
    }

    // // --------------------------------------------------------------------------------------------------------------
    // getModuleById(id: number): Observable<Module> {
    //     return this.http.get(this.moduleUrl + '/getmodule/' + id)
    // .map((res: Response) => res.json())
    // .catch(error => {
    //     console.log(error);
    //     return Observable.throw(error);
    // });
    // }

    // // --------------------------------------------------------------------------------------------------------------
    // getLastModuleId(): number {
    //     let idx = 0;
    //     this.httpClient.get<number>(this.moduleUrl + '/getlastidx')
    //         .subscribe(
    //         index => idx = index,
    //         err => console.log(err));
    //     return idx;
    // }


    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        let body = JSON.stringify(module);
        return this.http.post(this.moduleUrl + '/upsertmodule', body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }


    // MOCK
    // ==============================================================================================================
    // getSimpleModulesMock(): Module[] {
    //     let module1 = new Module();
    //     module1.id = 1;
    //     module1.title = 'Module 1';
    //     let module2 = new Module();
    //     module2.id = 2;
    //     module2.title = 'Module 2';
    //     let module3 = new Module();
    //     module3.id = 3;
    //     module3.title = 'Module 3';

    //     let mockModules: Module[] = [module1, module2, module3];
    //     return mockModules;
    // }

    // getModuleByIdMock(id: number): Module {
    //     let module = this.modules[id - 1];

    //     console.log("module.id: " + module.id);

    //     module.content = this.mockData.mockModules[module.id].content;
    //     module.example = this.mockData.mockModules[module.id].example;

    //     return module;
    // }
}