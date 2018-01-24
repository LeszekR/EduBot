import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DrawingCardsConfig } from './config/drawing-cards.config';
import { ViewChild } from '@angular/core';
import { PrizeInterface } from './config/prize.interface';
import { MessageService } from '../message/message.service';
import { DistractorComponent } from '../distractor/distractor.component';
import { Lottery } from '../../../models/enums';


// ==================================================================================================================
@Component({
    selector: 'app-drawing-cards',
    templateUrl: `./drawing-cards.component.html`,
    styleUrls: ['drawing-cards.component.css']
})
export class DrawingCardsComponent {

    @ViewChild('cardTemplate') cardTemplate: ElementRef;

    @Output() onLotteryChange = new EventEmitter<Lottery>();

    public readonly prizes: Array<PrizeInterface> = DrawingCardsConfig.prizes;
    public picked = false;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService
    ) { }


    // PRIVATE
    // ==============================================================================================================
    private pickCard(event, id): void {
        const card = event.target;

        // flipping the card
        card.parentNode.classList.add('flipped');

        // getting the result
        const result = this.shuffle(DrawingCardsConfig.prizes)[id];
        card.parentNode.getElementsByClassName('back')[0].innerHTML = result.textName;

        // recording the result and recalculating the game score
        this.onLotteryChange.emit(result.lottery);

        /*// msg for the user - the prize
        setTimeout(() => {
            this.messageService.info(result.msg, 'common.result');
        }, 1000);*/
        this.picked = true;
    }


    // --------------------------------------------------------------------------------------------------------------
    private shuffle(modelArray: Array<PrizeInterface>): Array<PrizeInterface> {
        const array = modelArray.slice();
        let counter = array.length;

        while (counter > 0) {
            const index = Math.floor(Math.random() * counter);
            counter--;
            const temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }
}
