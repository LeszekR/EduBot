import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { Module } from '../models/module'

import { MockData }     from '../mock/test-data'

// ==================================================================================================================
@Injectable()
export class ModuleService {

    private moduleUrl = 'http://localhost:64365/api/module';

    editedModuleId: number;

    mockModules: Module[];
    mockData: MockData = new MockData();


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    getSimpleModules(): Observable<Module> {
        return this.http.get(this.moduleUrl + '/all')
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    // getSimpleModules(): Observable<Module> {
    //     return new Observable<Module>(this.http.getHttp(this.moduleUrl + '/all'));
    // }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModulesMock(): Module[] {
        let module1 = new Module();
        module1.id = 1;
        module1.name = 'Module 1';
        let module2 = new Module();
        module2.id = 2;
        module2.name = 'Module 2';
        let module3 = new Module();
        module3.id = 3;
        module3.name = 'Module 3';
        this.mockModules = [module1, module2, module3];
        return this.mockModules;
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleById(id: number): Observable<Module> {
        return this.http.get(this.moduleUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        let body = JSON.stringify(module);
        return this.http.post(this.moduleUrl, body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }


    // MOCK
    // ==============================================================================================================
    getModuleByIdMock(id: number): Module {
        let module = this.mockModules[id - 1];

        console.log("module.id: " + module.id);

        console.log(this.mockData);

        module.content = this.mockData.mockModules[module.id].content;
        module.example = this.mockData.mockModules[module.id].example;
        
        return module;
    }
}