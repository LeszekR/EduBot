import { Injectable } from '@angular/core';

// Model
import { Distractor } from '../models/distractor';


// ==================================================================================================================
@Injectable()
export class DistractorService {


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() { }


    // PUBLIC
    // ==============================================================================================================
    show(distractor: Distractor) {

        // TODO: zamienić tymczasowe wypisanie dystraktora na konsolę na prawidłowe użycie
        console.log(distractor);
    }
}