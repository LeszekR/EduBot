import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { Module } from '../models/module'

@Injectable()
export class ModuleService {

    private moduleUrl = 'http://localhost:64365/api/module';

    constructor(private http: HttpService){}

    editedModuleId: number;

    getSimpleModules(): Observable<Module>{
        return this.http.get(this.moduleUrl + '/all')
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    getSimpleModulesMock(): Module[]{
        let module1 = new Module();
        module1.id = 1;
        module1.name = 'Module 1';
        let module2 = new Module();
        module2.id = 2;
        module2.name = 'Module 2';
        let module3 = new Module();
        module3.id = 3;
        module3.name = 'Module 3';
        return [module1, module2, module3];
    }
    
    getModuleById(id: number): Observable<Module>{
        return this.http.get(this.moduleUrl + '/' + id )
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    getModuleByIdMock(id: number): Module{
        let module = new Module();
        module.id = 1;
        module.examples = "12345 123143 fsdfsdf  fs fsd dsf sd sd fsd s sdfs fs sd fsd ";
        module.material = "sd sdf sd fsd fg fdg fa asd gdsf d ds fds sd d d  d dd d d d";
        return module;
    }
 
    saveModule(module: Module): Observable<Module>{
        let body = JSON.stringify(module);
        return this.http.post(this.moduleUrl, body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
}