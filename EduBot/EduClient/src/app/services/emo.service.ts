import { Injectable } from '@angular/core';

// Models
import { Distractor } from '../models/distractor'

//Services
import { HttpService } from './http.service'
import { CameraService } from './camera.service'
import { EduService } from './edu.service'


// ==================================================================================================================
@Injectable()
export class EmoService {

    private emoUrl = 'http://localhost:64365/api/image/send';
    private pixTimer: any;

    // TODO - przestawić krótk  mock picInterval na normalny - długi
    //  this.picInterval = 30000;
    private readonly timeBetweenPix = 3000;
    public alive: boolean = false;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService,
        private edu: EduService,
        private camera: CameraService
    ) { }


    // MOCK
    // ==============================================================================================================
    mockSendPic() {
        this.takeSendPicture();
    }


    // PUBLIC
    // ==============================================================================================================
    start() {
        this.alive = true;
        let that = this;
        this.pixTimer = setInterval(function () { that.takeSendPicture(); }, this.timeBetweenPix);
    }

    // --------------------------------------------------------------------------------------------------------------
    stop() {
        this.alive = false;
        clearInterval(this.pixTimer);
    }


    // PRIVATE
    // ==============================================================================================================
    private takeSendPicture(): void {
        let pic = this.camera.makePicture();
        if (pic !== null) {
            this.http.post<Distractor>(this.emoUrl, pic, true)
                .subscribe(distractor => {
                    if (distractor != null)
                        this.edu.serverWantsToDistract(distractor);
                });
        }
    }
}
