import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Subscriber } from 'rxjs/Subscriber';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ModuleService } from '../services/module.service';
import { ContextService } from '../services/context.service'
import { Module } from '../models/module'


// ==================================================================================================================
@Injectable()
export class ModuleResolver implements Resolve<any> {


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private service: ModuleService,
        private router: Router,
        private context: ContextService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        this.context.currentModuleId = +route.params['moduleId'];
        return this.service.getModuleById(this.context.currentModuleId);
    }
}