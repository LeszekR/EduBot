import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

        if (this.context.isEditMode)
            return this.service.getModuleByIdEdit(this.context.currentModuleId);
        else
            return this.service.getModuleByIdLearn(this.context.currentModuleId);
    }
}