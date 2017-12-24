import { Injectable } from '@angular/core';

// Models
import { Distractor } from '../models/distractor';

//Services
import { HttpService } from './http.service';
import { CameraService } from './camera.service'
import { EduService } from './edu.service'


// ==================================================================================================================
@Injectable()
export class EmoService {

    private emoUrl = 'http://localhost:64365/api//image/send';
    private pixTimer;

    // TODO - przestawić krótk  mock picInterval na normalny - długi
    // private picInterval = 30000;
    private picInterval = 5000;
    

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService,
        private edu: EduService,
        private camera: CameraService) {

        this.start();
    }


    // PUBLIC
    // ==============================================================================================================
    start() {
        this.pixTimer = setTimeout(this.takeSendPicture, this.picInterval);
    }

    // --------------------------------------------------------------------------------------------------------------
    stop() {
        this.pixTimer.stop();
    }


    // PRIVATE
    // ==============================================================================================================
    private takeSendPicture(): void {
        let pic = this.camera.makePicture();
        this.http.post<Distractor>(this.emoUrl, pic)
            .subscribe(distractor => {
                if (distractor != null)
                    this.edu.serverWantsToDistract(distractor);
            });
    }
}