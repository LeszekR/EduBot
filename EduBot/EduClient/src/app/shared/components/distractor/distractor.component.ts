import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { DistractorService } from '../../../services/distractor.service';
import { Distractors, Distractor, Images } from '../../../models/distractor';
import { Lottery } from '../../../models/enums';
import { TestTaskService } from '../../../services/test.service';
import { LotteryItems } from '../fortune-wheel/config/fortune-wheel.config';
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
    private showMsg: boolean;

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
        this.showMsg = false;

        let type = distractor.distr_content;

        // distractor programs set the distractorComponent to show and record what is needed
        if (type == Distractors.fortuneWheel)
            this.showWheelOfFortune = true;

        else if (type == Distractors.drawCards)
            this.showCardsDraw = true;


        // other distractors need distractorCompoent to be set for them
        else {
            this.imgSrc = this.IMG_PATH + Images.list[type];
            this.showDistractor = true;

            if (type == Distractors.hiddenMine) {
                this.lottery = Lottery.DECOY;
                this.showMsg = true;
            }

            else if (type == 'death') {
                this.lottery = Lottery.DEATH;
                this.showMsg = true;
            }
        }

        // ESC listener
        document.onkeydown = (e: any) => {
            if (e.which == this.KEY_ESC)
                this.hide();
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    private hide() {

        // record lottery prize in the database and get recent GameScore
        if (this.lottery) {
            let result = LotteryItems.list.filter(p => p.lottery == this.lottery).shift();
            this.testTaskService.recordLotteryResult(this.lottery);
            if (this.showMsg) this.message = result.msg;
        }

        // show to the user what happened (in case other component has not done it yet)
        if (this.showMsg)
            this.messageService.info(this.message, 'common.result').then(
                res => {
                    this.imgSrc = null;
                    this.showDistractor = false;
                    this.showWheelOfFortune = false;
                    this.showCardsDraw = false;
                }
            );

        // clean up everthing
        this.lottery = null;
        this.message = "";
        this.showMsg = false;
    }
}
