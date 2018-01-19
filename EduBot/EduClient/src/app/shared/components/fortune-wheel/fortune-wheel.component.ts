import { Component, ElementRef, Input } from '@angular/core';
import { FortuneWheelConfig } from './config/fortune-wheel.config';
import { ViewChild } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Images } from '../../../models/distractor';
import { DistractorComponent } from '../distractor/distractor.component';


// ==================================================================================================================
@Component({
    selector: 'app-fortune-wheel',
    templateUrl: `./fortune-wheel.component.html`,
    styleUrls: ['fortune-wheel.component.css']
})
export class FortuneWheelComponent {

    private static readonly interval = 1000;
    private static readonly minimalSpeed = 50;

    @ViewChild('fortuneWheel') fortuneWheel: ElementRef;
    @ViewChild('spinButton') spinButton: ElementRef;

    private IMG_PATH = '/assets/img/';
    @Input() private readonly bckgrAddress = this.IMG_PATH + Images.list.fortuneWheelBckgr;
    @Input() private readonly wheelAddress = this.IMG_PATH + Images.list.fortuneWheel;

    @Input() private distractorComp: DistractorComponent;

    private add = 0.5;
    private speed: number;
    private time: number;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    public spinTheWheel() {
        this.speed = (Math.random() * 3);
        this.time = (new Date()).getTime();
        const fortuneWheelStyles = this.fortuneWheel.nativeElement.style;
        fortuneWheelStyles.webkitAnimationDuration = this.speed + 's';
        fortuneWheelStyles.webkitAnimationTimingFunction = 'linear';
        fortuneWheelStyles.webkitAnimationIterationCount = 'infinite';
        fortuneWheelStyles.webkitAnimationName = 'spinnerRotate';
    }

    // --------------------------------------------------------------------------------------------------------------
    public letItRoll(): void {

        this.spinButton.nativeElement.disabled = true;
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

                const angle = 360 - ((secondsPassed + delay) / this.speed * 100 % 100 * 3.6);
                const result = FortuneWheelConfig.prizes
                    .filter(obj => obj.from < angle && obj.to >= angle)
                    .shift();

                clearInterval(wheelSpinning);
                this.fortuneWheel.nativeElement.style.webkitAnimationPlayState = 'paused';

                // recording the result and recalculating the game score
                this.distractorComp.lottery = result.lottery;

                // the player gets informed what they've just drawn to their doom..
                setTimeout(() => {
                    this.messageService.info(result.msg, 'common.result');
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
        this.add *= 2;
        return speed;
    }
}
