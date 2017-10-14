import { Injectable, OnInit } from '@angular/core';

//Models
import { Role } from '../models/role';

//Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
@Injectable()
export class ContextService {

    userRole: Role;
    editModuleId: number;

    ngOnInit(){
        this.userRole = Role.Admin;
    }
    
}