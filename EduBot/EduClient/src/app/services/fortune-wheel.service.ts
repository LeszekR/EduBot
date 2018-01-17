import { Injectable } from '@angular/core';


// ==================================================================================================================
@Injectable()
export class FortuneWheelService {

    private add: number;
    private speed: number;
    private time: number;


    // PUBLIC
    // ==============================================================================================================
    public letItRole(): void {
        (document.getElementById('spinButton') as any).disabled = true;
        this.add = 1;
        const interval = 1000;
        let secondsPassed =  (new Date().getTime() - this.time) / 1000;
        let delay = 0;

        const wheelSpinning = setInterval(() => {
            const prevSpeed = this.speed;
            this.speed = this.adjustSpeed(this.speed);

            secondsPassed += interval / 1000;
            const currentTimeFactor = (secondsPassed + delay) / prevSpeed;
            delay = currentTimeFactor * this.speed - secondsPassed;

            this.slowDownTheWheel(this.speed, delay);
            if (this.speed > 60) {
                const result = 360 - ((secondsPassed + delay) / this.speed * 100 % 100 * 3.6);
                const drawn = (window as any).wheelConfig
                    .filter(obj => obj.from < result && obj.to >= result)
                    .shift();
                clearInterval(wheelSpinning);
                document.getElementById('fortuneWheel').style.webkitAnimationPlayState = 'paused';
                (document.getElementById('spinButton') as any).disabled = false;
                setTimeout(() => {
                    alert('rezultat: ' + drawn.name);
                    (document.getElementById('fortuneWheel') as any).style = {};
                }, 200);
            }
        }, interval);
    }


    // PRIVATE
    // ==============================================================================================================
    public spinTheWheel() {
        this.speed = (Math.random() * 3);
        this.time = (new Date()).getTime();
        const fortuneWheelStyles = document.getElementById('fortuneWheel').style;
        fortuneWheelStyles.position = 'fixed';
        fortuneWheelStyles.webkitAnimationDuration = this.speed + 's';
        fortuneWheelStyles.webkitAnimationTimingFunction = 'linear';
        fortuneWheelStyles.webkitAnimationIterationCount = 'infinite';
        fortuneWheelStyles.webkitAnimationName = 'spinnerRotate';
    }


    // --------------------------------------------------------------------------------------------------------------
    private slowDownTheWheel(speed, delay) {
        const fortuneWheelStyles = document.getElementById('fortuneWheel').style;
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
