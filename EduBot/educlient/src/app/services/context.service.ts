import { Injectable, OnInit } from '@angular/core';

//Models
import { Role } from '../models/enum-user-role';


// ==================================================================================================================
//Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
@Injectable()
export class ContextService {

    userRole: Role;
    editModuleId: number;
    isEditMode: boolean = false;


    // PUBLIC
    // ==============================================================================================================
    ngOnInit(){
        this.userRole = Role.admin;
    }    
}