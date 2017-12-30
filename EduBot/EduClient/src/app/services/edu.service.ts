import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { ModulDistracDTO } from '../models/module-and-distractor-DTO'
import { Distractor } from '../models/distractor';
import { GameScore } from '../models/game-score';
import { dictionary } from '../languages/index';


// ==================================================================================================================
@Injectable()
export class EduService {

    private eduUrl = 'http://localhost:64365/api/edu';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    getScore(): Observable<GameScore> {
        return this.http.get<GameScore>(this.eduUrl + '/getscore');
    }

    // --------------------------------------------------------------------------------------------------------------
    /* Shows distractor sent from server in reaction to unwanted emo-state of the student.
     * Before doing so picks appropriate moment, so as not to get in the way of whatever the 
     * student is actually dealing with.
     */
    serverWantsToDistract(distractor: Distractor) {

        // TODO pokazać od razu lub w odpowiedniej chwili dystraktor przysłany przez serwer
        // decide wheteher to show the distractor now

        // show the distractor when the appropriate moment comes
        console.log(distractor);
    }

    // --------------------------------------------------------------------------------------------------------------
    explainModule(moduleId: number): Observable<Module[]> {
        return this.http.get<Module[]>(this.eduUrl + '/explainmodule/' + moduleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    prevModule(currentModuleId: number): Observable<ModulDistracDTO> {
        return this.http.get<ModulDistracDTO>(this.eduUrl + '/prevmodule/' + currentModuleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    nextModule(currentModuleId: number): Observable<ModulDistracDTO> {
        let moduleId = currentModuleId == undefined ? 0 : currentModuleId;
        return this.http.get<ModulDistracDTO>(this.eduUrl + '/nextmodule/' + moduleId);
    }
}