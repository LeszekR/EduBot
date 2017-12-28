import { Injectable, OnInit } from '@angular/core';

//Models
import { Role } from '../models/enum-user-role';
import { Module } from '../models/module'

// ==================================================================================================================
//Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
@Injectable()
export class ContextService {

    userRole: Role;
    isEditMode: boolean = false;
    currentModuleId: number;
    currentModule: Module;

    constructor(){
        let role = sessionStorage.getItem("user_role");
        if(role != undefined)
            this.userRole = Role[<string>role];
    }

}