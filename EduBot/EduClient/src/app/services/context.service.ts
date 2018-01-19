import { Injectable, OnInit } from '@angular/core';

//Models
import { Role, MilitaryRank } from '../models/enums';
import { Module } from '../models/module'
import { ModuleViewComponent } from '../views/module-view/module-view.component'
import { ModuleListComponent } from '../views/module-list-view/module-list.component'
import { AppComponent } from '../app.component';
import { GameScore } from '../models/game-score';
import { CodeTaskFront } from '../models/code-task';


// ==================================================================================================================
/* Serwis zawierający informacje o zalogowanym użytkowniku, uprawnieniach, obecnym stanie
 * oraz pośredniczący w komunikacji między komponentami, niezależnie od ich pokrewieństwa
 */
@Injectable()
export class ContextService {

    // aktualny stan
    userRole: Role;
    isEditMode: boolean = false;
    currentModuleId: number;
    gameScore: GameScore;
    
    // pośrednictwo między komponentami
    appComponent: AppComponent;
    moduleList: ModuleListComponent;
    moduleViewComponent: ModuleViewComponent;
    currentModule: Module;
    currentCodeTask: CodeTaskFront;
    codeOutputDiv: HTMLDivElement;

    //zapamiętywanie stanu tabów code task
    activeTabs: Map<number,number>;

    
    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() {
        let role = sessionStorage.getItem("user_role");
        if (role != undefined)
            this.userRole = Role[<string>role];

        this.activeTabs = new Map();
        this.gameScore = new GameScore();
        this.gameScore.life = 0;
        this.gameScore.shield = 0;
        this.gameScore.progress = 0;
        this.gameScore.rank = MilitaryRank.Soldier;
    }
}