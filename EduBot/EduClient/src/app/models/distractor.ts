import { DistractorComponent } from "../shared/components/distractor/distractor.component";


// ==================================================================================================================
export class Distractor {
    distr_content: string;
}

// ==================================================================================================================
export class Images {

    public static list = {

        fortuneWheel: "fortune-wheel.png",
        fortuneWheelBckgr: "fortune-wheel-backgr.png",
        drawCards: "draw-card.png",

        questionError: "question-explosion.png",
        questionSuccess: "question-disarmed.png",

        codeFirstError: "code-mine-awaken.png",
        codeSecondError: "code-mine-critical.png",
        codeThirdError: "code-mine-explosion.png",
        codeSuccess: "code-disarmed.png",

        promotion_01: "promotion-01.png",
        degradation_01: "degradation-01.png",

        hiddenMine: "hidden-mine-01.png",
        
        end_game: "end-game.png",
    }
}

// ==================================================================================================================
export class Distractors {

    static readonly fortuneWheel = 'fortuneWheel';
    static readonly drawCards = 'drawCards';
    static readonly hiddenMine = 'hiddenMine';

    static obligatory(distractor: Distractor){

        let mustDo = [
            this.hiddenMine
        ];        

        return mustDo.indexOf(distractor.distr_content) > -1;
    } 
}
