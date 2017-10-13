import { Injectable, OnInit } from '@angular/core';

//Models
import { Role } from '../models/role';

//Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
@Injectable()
export class ContextService {

    isEditMode: boolean;
    userRole: Role;

    ngOnInit(){
        this.isEditMode = false;
        this.userRole = Role.Admin;
    }
    
}