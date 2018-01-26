import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { DistractorService } from '../../../services/distractor.service';
import { Distractors, Distractor, Images } from '../../../models/distractor';
import { Lottery } from '../../../models/enums';
import { TestTaskService } from '../../../services/test.service';
import { LotteryItems } from '../fortune-wheel/config/fortune-wheel.config';
import { MessageService } from '../message/message.service';
import { ContextService } from '../../../services/context.service';

// ==================================================================================================================
@Component({
    moduleId: module.id,
    selector: 'distractor-component',
    templateUrl: `./distractor.component.html`,
    styleUrls: ['distractor.component.css']
})
export class DistractorComponent implements OnDestroy {

    private readonly KEY_ESC = 27;
    private readonly IMG_PATH = '/assets/img/';

    private showDistractor: boolean;
    private showWheelOfFortune: boolean;
    private showCardsDraw: boolean;
    private distractorSubsciption: any;
    private imgSrc;

    lottery: Lottery;
    private message: string;
    private showMsg: boolean;
    private promotion: boolean;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private service: DistractorService,
        private testTaskService: TestTaskService,
        private messageService: MessageService,
        private context: ContextService) {

        this.distractorSubsciption = this.service.onShowDistractor.subscribe(d => this.show(d));
    }



    // --------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.distractorSubsciption.unsubscribe();
    }

    private lotteryChange(lottery: Lottery) {
        this.lottery = lottery;
        this.showMsg = true;
        this.showMsgAndHide();
    }


    // PRIVATE
    // ==============================================================================================================
    private show(distractor: Distractor) {

        this.lottery = null;
        this.message = "";
        this.showMsg = false;
        this.promotion = false;

        let type = distractor.distr_content;

        // distractor programs set the distractorComponent to show and record what is needed
        if (type == Distractors.fortuneWheel)
            this.showWheelOfFortune = true;

        else if (type == Distractors.drawCards)
            this.showCardsDraw = true;


        // other distractors need distractorComponent to be set for them
        else {
            this.imgSrc = this.IMG_PATH + Images.list[type];
            this.showDistractor = true;

            if (type == Distractors.hiddenMine) {
                this.lottery = Lottery.DECOY;
                this.showMsg = true;

                setTimeout(() => { this.showMsgAndHide(); }, 1000);
            }

            else if (type == 'death') {
                this.lottery = Lottery.DEATH;
                this.showMsg = true;
            }

            else if (distractor.distr_content == "promotion_01")
                this.promotion = true;
        }

        // ESC listener
        document.onkeyup = (e: any) => {
            if (e.which == this.KEY_ESC)
                this.showMsgAndHide();
        }
    }

    // --------------------------------------------------------------------------------------------------------------
    private showMsgAndHide() {

        console.log(this.lottery);

        // record lottery prize in the database and get recent GameScore
        if (this.lottery) {
            let result = LotteryItems.list.find(p => p.lottery == this.lottery);
            console.log("Result: " + result);
            this.testTaskService.recordLotteryResult(this.lottery);
            if (this.showMsg) this.message = result.msg;
        }

        // show to the user what happened (in case other component has not done it yet)
        if (this.showMsg)
            this.messageService.info(this.message, 'common.result')
                .then(res =>
                    setTimeout(() => {
                        document.onkeyup = (e: any) => {
                            if (e.which == this.KEY_ESC)
                                this.hide();
                        }
                    }, 100)
                );
        //.then(res => this.hide());
        else
            this.hide();

        // // clean up everthing
        // this.lottery = null;
        // this.message = "";
        // this.showMsg = false;
    }

    // --------------------------------------------------------------------------------------------------------------
    private hide() {

        // hide everything from screen
        this.imgSrc = null;
        this.showDistractor = false;
        this.showWheelOfFortune = false;
        this.showCardsDraw = false;

        // clean up everything
        this.lottery = null;
        this.message = "";
        this.showMsg = false;

        // show reward distractor on every promotion
        if (this.promotion)
            this.context.appComponent.setEmoState(5);

        this.promotion = false;
    }
}
