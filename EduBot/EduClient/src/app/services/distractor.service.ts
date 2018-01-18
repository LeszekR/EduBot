import { Injectable, Output, EventEmitter } from '@angular/core';

// Model
import { Distractor } from '../models/distractor';


// ==================================================================================================
@Injectable()
export class DistractorService {

    @Output() onShowDistractor = new EventEmitter<Distractor>();


    // PUBLIC
    // ==============================================================================================
    public show(distractor: Distractor): void {
        this.onShowDistractor.emit(distractor);
    }
}