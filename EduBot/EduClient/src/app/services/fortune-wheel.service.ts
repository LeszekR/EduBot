import { Injectable } from '@angular/core';


// ==================================================================================================================
@Injectable()
export class FortuneWheelService {

    private add: number;


    // PUBLIC
    // ==============================================================================================================
    public spinTheWheel(): void {
        this.add = 1;
        let speed = 2;
        speed = (Math.random() * 3);
        const interval = 1000;
        let secondsPassed = 0;
        let delay = 0;
        this.spin(speed);

        const wheelSpinning = setInterval(function(){
            const prevSpeed = speed;
            speed = this.adjustSpeed(speed);

            secondsPassed++;
            const currentTimeFactor = (secondsPassed + delay) / prevSpeed;
            delay = currentTimeFactor * speed - secondsPassed;

            this.slowDownTheWheel(speed, delay);
            if (speed > 45) {
                const result = (secondsPassed + delay) / speed * 100 % 100 + '%';
                const spins = Math.floor((secondsPassed + delay) / speed);
                clearInterval(wheelSpinning);
                document.getElementById('fortuneWheel').style.webkitAnimationPlayState = 'paused';
                alert('obroty: ' + spins + '\nrezultat: ' + result);
            }
        }, interval);
    }


    // PRIVATE
    // ==============================================================================================================
    private spin(speed) {
        const fortuneWheelStyles = document.getElementById('fortuneWheel').style;
        fortuneWheelStyles.position = 'fixed';
        fortuneWheelStyles.webkitAnimationDuration = speed + 's';
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
