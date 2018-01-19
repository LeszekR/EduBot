import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { DistractorService } from '../../../services/distractor.service';
import { Distractors, Distractor, Images } from '../../../models/distractor';
import { Lottery } from '../../../models/enums';
import { TestTaskService } from '../../../services/test.service';
import { FortuneWheelConfig } from '../fortune-wheel/config/fortune-wheel.config';
import { MessageService } from '../message/message.service';


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

    lottery: Lottery;
    private message: string;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private service: DistractorService,
        private testTaskService: TestTaskService,
        private messageService: MessageService) {

        this.distractorSubsciption = this.service.onShowDistractor.subscribe(d => this.show(d));
    }

    // --------------------------------------------------------------------------------------------------------------
    ngAfterViewInit() {
        document.onkeydown = (e: any) => {
            if (e.which == this.KEY_ESC)
                this.hide();
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.distractorSubsciption.unsubscribe();
    }


    // PRIVATE
    // ==============================================================================================================
    private show(distractor: Distractor) {

        this.lottery = null;
        this.message = "";

        let type = distractor.distr_content;

        if (type == Distractors.fortuneWheel)
            this.showWheelOfFortune = true;

        else if (type == Distractors.drawCards)
            this.showCardsDraw = true;

        else if (type == Distractors.hiddenMine) {
            this.imgSrc = this.IMG_PATH + Images.list[type];
            this.lottery = Lottery.DECOY;
            this.showDistractor = true;
        }
        else if (type == 'death') {
            this.imgSrc = this.IMG_PATH + Images.list[type];
            this.message = 'lottery.death';
            this.showDistractor = true;
        }
        else {
            this.imgSrc = this.IMG_PATH + Images.list[type];
            this.showDistractor = true;
        }

        document.onkeydown = (e: any) => {
            if (e.which == this.KEY_ESC) {
                this.hide();
                // document.onkeydown = null;
            }
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    private hide() {

        this.imgSrc = null;
        this.showDistractor = false;
        this.showWheelOfFortune = false;
        this.showCardsDraw = false;

        // record lottery prize in the database and get recent GameScore
        if (this.lottery) {
            let result = FortuneWheelConfig.prizes.filter(p => p.lottery == this.lottery).shift();
            this.testTaskService.recordLotteryResult(this.lottery);
            this.message = result.msg;
        }

        // show user what happened in case other component has not done it yet
        if (this.message)
            this.messageService.info(this.message, 'common.result');
    }
}
