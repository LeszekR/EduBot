import { Component, OnDestroy } from '@angular/core';
import { DistractorService } from '../../../services/distractor.service';
// import { DistractorType } from '../../../models/enums';
import { Distractors, Distractor } from '../../../models/distractor';


// ==================================================================================================================
@Component({
    moduleId: module.id,
    selector: 'distractor-component',
    templateUrl: `./distractor.component.html`,
    styleUrls: ['distractor.component.css']
})
export class DistractorComponent implements OnDestroy {

    private KEY_ESC = 27;
    private IMG_PATH = '/assets/img/';

    private showDistractor: boolean;
    private showWheelOfFortune: boolean;
    private showCardsDraw: boolean;
    private distractorSubsciption: any;
    private imgSrc;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private service: DistractorService) {
        this.distractorSubsciption = this.service.onShowDistractor.subscribe(d => this.show(d));
    }

    // --------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.distractorSubsciption.unsubscribe();
    }


    // PRIVATE
    // ==============================================================================================================
    private show(distractor: Distractor) {

        let type = distractor.distr_content;

        // if (type == DistractorType.WheelOfFortune) {
        if (type == Distractors.rewardPrograms.fortuneWheel) {
            this.showWheelOfFortune = true;
        }
        // else if (type == DistractorType.CardsDraw) {
        else if (type == Distractors.rewardPrograms.drawCards) {
            this.showCardsDraw = true;
        }
        else {
            // this.imgSrc = this.getImgSrc(type);
            this.imgSrc = this.IMG_PATH + Distractors.mixed[type];
            this.showDistractor = true;
        }

        document.onkeydown = (e: any) => {
            if (e.which == this.KEY_ESC) {
                this.hide();
            }
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    private hide() {
        this.imgSrc = null;
        this.showDistractor = false;
        this.showWheelOfFortune = false;
        this.showCardsDraw = false;
    }

    // // --------------------------------------------------------------------------------------------------------------
    // private getImgSrc(type: DistractorType): string {
    //     switch (type) {
    //         case DistractorType.SmallExplosionThreat:
    //             return this.IMG_PATH + "small-explosion.png";
    //         case DistractorType.BigExplosionThreat:
    //             return this.IMG_PATH + "medium-explosion.png";
    //         case DistractorType.BigExplosion:
    //             return this.IMG_PATH + "big-explosion.png";
    //         case DistractorType.DisarmedMine:
    //             return this.IMG_PATH + "disarmed.png";
    //         case DistractorType.HiddenMine:
    //             return this.IMG_PATH + "logo-pg.png";
    //         case DistractorType.Promotion:
    //             return this.IMG_PATH + "logo-pg.png";
    //         default:
    //             return null;
    //     }
}
