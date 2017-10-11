import { Injectable } from '@angular/core';

//Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
@Injectable()
export class ContextService {

    isEditMode: boolean = false;
    
}