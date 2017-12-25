import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable'
import { IntervalObservable } from 'rxjs/observable/IntervalObservable'
import 'rxjs/add/operator/takeWhile';

// Models
import { Distractor } from '../models/distractor';

//Services
import { HttpService } from './http.service';
import { CameraService } from './camera.service'
import { EduService } from './edu.service'


// ==================================================================================================================
@Injectable()
export class EmoService {

    private emoUrl = 'http://localhost:64365/api/image/send';
    private pixTimer: any;

    // TODO - przestawić krótk  mock picInterval na normalny - długi
    //  this.picInterval = 30000;
    private readonly picInterval = 3000;
    private alive: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService,
        private edu: EduService,
        private camera: CameraService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    intOs: Observable<number>[] = [];
    start() {
        this.alive = true;
        let t = IntervalObservable.create(this.picInterval);
        this.intOs[this.intOs.length] = t;
        t.takeWhile(() => this.alive)
            .subscribe(() =>
                this.takeSendPicture()
            );
    }

    // --------------------------------------------------------------------------------------------------------------
    stop() {
        this.alive = false;
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