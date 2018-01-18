import { Component, ElementRef } from '@angular/core';
import { DrawingCardsConfig } from './config/drawing-cards.config';
import { ViewChild } from '@angular/core';
import { TestTaskService } from '../../../services/test.service';
import { PrizeInterface } from './config/prize.interface';
import { MessageService } from '../message/message.service';


// ==================================================================================================================
@Component({
    selector: 'app-drawing-cards',
    templateUrl: `./drawing-cards.component.html`,
    styleUrls: ['drawing-cards.component.css']
})
export class DrawingCardsComponent {

    @ViewChild('cardTemplate') cardTemplate: ElementRef;

    public readonly prizes: Array<PrizeInterface> = DrawingCardsConfig.prizes;
    public picked = false;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private messageService: MessageService,
        private testTaskService: TestTaskService
    ) { }


    // PRIVATE
    // ==============================================================================================================
    private pickCard(event, id): void {
        const card = event.target;
        card.parentNode.classList.add('flipped');
        const result = this.shuffle(DrawingCardsConfig.prizes)[id];
        card.parentNode.getElementsByClassName('back')[0].innerHTML = result.textName;
        setTimeout(() => {
            this.messageService.info(result.msg, 'common.result');
        }, 1000);
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
