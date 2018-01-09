import { Injectable } from '@angular/core';

// Models
import { Distractor } from '../models/distractor';

// Services
import { HttpService } from './http.service';
import { CameraService } from './camera.service';
import { EduService } from './edu.service';


// ==================================================================================================================
@Injectable()
export class EmoService {

    private emoUrl = 'http://localhost:64365/api/image/send';
    private pixTimer: any;

    private readonly timeBetweenPix = 30000;
    public alive = false;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService,
        private edu: EduService,
        private camera: CameraService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    start() {
        this.alive = true;
        this.pixTimer = setInterval(
            () => this.takeSendPicture(),
            this.timeBetweenPix
        );
    }


    // ==============================================================================================================
    stop() {
        this.alive = false;
        clearInterval(this.pixTimer);
    }


    // ==============================================================================================================
    sendPic() {
        this.takeSendPicture();
    }


    // PRIVATE
    // ==============================================================================================================
    private takeSendPicture(): void {
        const pic = this.camera.makePicture();
        if (pic !== null) {
            this.http.post<Distractor>(this.emoUrl, pic, true)
                .subscribe(distractor => {
                    if (distractor != null) {
                        this.edu.serverWantsToDistract(distractor);
                    }
                });
        }
    }
}
