import { Component, ElementRef, Input } from '@angular/core';
import { FortuneWheelConfig } from './config/fortune-wheel.config';
import { ViewChild } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Images } from '../../../models/distractor';
import { TestTaskService } from '../../../services/test.service';


// ==================================================================================================================
@Component({
    selector: 'app-fortune-wheel',
    templateUrl: `./fortune-wheel.component.html`,
    styleUrls: ['fortune-wheel.component.css']
})
export class FortuneWheelComponent {

    private static readonly interval = 1000;
    private static readonly minimalSpeed = 60;

    @ViewChild('fortuneWheel') fortuneWheel: ElementRef;
    @ViewChild('spinButton') spinButton: ElementRef;

    private IMG_PATH = '/assets/img/';
    @Input() private readonly bckgrAddress = this.IMG_PATH + Images.list.fortuneWheelBckgr;
    @Input() private readonly wheelAddress = this.IMG_PATH + Images.list.fortuneWheel;

    private add: number;
    private speed: number;
    private time: number;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService,
        private testTaskService: TestTaskService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    public spinTheWheel() {
        this.speed = (Math.random() * 3);
        this.time = (new Date()).getTime();
        const fortuneWheelStyles = this.fortuneWheel.nativeElement.style;
        // fortuneWheelStyles.position = 'absolute';
        fortuneWheelStyles.webkitAnimationDuration = this.speed + 's';
        fortuneWheelStyles.webkitAnimationTimingFunction = 'linear';
        fortuneWheelStyles.webkitAnimationIterationCount = 'infinite';
        fortuneWheelStyles.webkitAnimationName = 'spinnerRotate';
    }

    // --------------------------------------------------------------------------------------------------------------
    public letItRoll(): void {

        this.spinButton.nativeElement.disabled = true;
        this.add = 1;
        let secondsPassed = (new Date().getTime() - this.time) / 1000;
        let delay = 0;

        const wheelSpinning = setInterval(() => {

            const prevSpeed = this.speed;
            this.speed = this.adjustSpeed(this.speed);

            secondsPassed += FortuneWheelComponent.interval / 1000;
            const currentTimeFactor = (secondsPassed + delay) / prevSpeed;
            delay = currentTimeFactor * this.speed - secondsPassed;

            this.slowDownTheWheel(this.speed, delay);
            if (this.speed > FortuneWheelComponent.minimalSpeed) {
                const result = 360 - ((secondsPassed + delay) / this.speed * 100 % 100 * 3.6);
                const drawn = FortuneWheelConfig.prizes
                    .filter(obj => obj.from < result && obj.to >= result)
                    .shift();

                clearInterval(wheelSpinning);
                this.fortuneWheel.nativeElement.style.webkitAnimationPlayState = 'paused';
                // this.spinButton.nativeElement.disabled = false;


                // recording the result and recalculating the game score
                this.testTaskService.recordLotteryResult(drawn.name);

                // info for the player
                setTimeout(() => {
                    this.messageService.info(drawn.msg, 'common.result');
                }, 200);
            }
        }, FortuneWheelComponent.interval);
    }


    // PRIVATE
    // ==============================================================================================================
    private slowDownTheWheel(speed, delay) {
        const fortuneWheelStyles = this.fortuneWheel.nativeElement.style;
        fortuneWheelStyles.webkitAnimationDuration = speed + 's';
        fortuneWheelStyles.webkitAnimationDelay = '-' + delay + 's';
    }

    // --------------------------------------------------------------------------------------------------------------
    private adjustSpeed(speed) {
        speed += this.add;
        this.add++;
        return speed;
    }
}
