import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ModuleService } from '../services/module.service';


// ==================================================================================================================
@Injectable()
export class ModuleResolver implements Resolve<any> {

    public currentModuleId: number;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private service: ModuleService,
        private router: Router
    ) { }


    // PUBLIC
    // ==============================================================================================================
    resolve(route: ActivatedRouteSnapshot) : Observable<any> | Promise<any> | any {
        this.currentModuleId = route.params['moduleId'];
        return this.service.getModuleById(this.currentModuleId);
    }
}