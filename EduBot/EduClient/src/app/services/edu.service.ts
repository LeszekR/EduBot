import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';

// Model
import { Module } from '../models/module'
import { ModulDistracDTO } from '../models/module-and-distractor-DTO'
import { Distractor, Distractors } from '../models/distractor';
import { GameScore } from '../models/game-score';
import { dictionary } from '../languages/index';
import { DistractorService } from './distractor.service';
import { MessageService } from '../shared/components/message/message.service';
import { ContextService } from './context.service';
// import { Lottery } from '../models/enums';


// ==================================================================================================================
@Injectable()
export class EduService {

    private eduPath = '/api/edu';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService,
        private distractorService: DistractorService,
        private msgService: MessageService,
        private context: ContextService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    /* Shows distractor sent from server in reaction to unwanted emo-state of the student.
     * Before doing so picks appropriate moment, so as not to get in the way of whatever the 
     * student is actually dealing with.
     */
    serverWantsToDistract(distractor: Distractor, msg: string) {

        // if it's 'reward' distractor - let the user decide wheteher to show the distractor now
        let showDistractor = true;
        if (!Distractors.obligatory(distractor) || msg != "")
            this.msgService.confirm(msg != "" ? msg : 'edu.want-a-distractor', 'edu.sth-for-you')
                .then(decision => {
                    if (decision) this.distractorService.show(distractor);
                });

        //if not asking or the user wants it - show the distractor
        else
            this.distractorService.show(distractor);

        console.log(distractor);
    }

    // --------------------------------------------------------------------------------------------------------------
    getScore(): Observable<GameScore> {
        return this.http.get<GameScore>(this.eduPath + '/getscore');
    }

    // --------------------------------------------------------------------------------------------------------------
    explainModule(moduleId: number): Observable<Module[]> {
        return this.http.get<Module[]>(this.eduPath + '/explainmodule/' + moduleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    prevModule(currentModuleId: number): Observable<ModulDistracDTO> {
        return this.http.get<ModulDistracDTO>(this.eduPath + '/prevmodule/' + currentModuleId);
    }

    // --------------------------------------------------------------------------------------------------------------
    nextModule(currentModuleId: number): Observable<ModulDistracDTO> {
        let moduleId = currentModuleId == undefined ? 0 : currentModuleId;
        return this.http.get<ModulDistracDTO>(this.eduPath + '/nextmodule/' + moduleId, true);
    }
}