import { Injectable } from '@angular/core';


// ==================================================================================================================
@Injectable()
export class CameraService {


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor() { }


    // PUBLIC
    // ==============================================================================================================
    makePicture(): string {
        // TODO 1. wykonać zdjęcie, 2. skonwertować do formatu gotowego do wysłania do serwera
        return "nowe zdjęcie";
    }
}