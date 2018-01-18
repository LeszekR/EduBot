import { Lottery } from '../../../../models/enums';
import { PrizeInterface } from './prize.interface';

export class DrawingCardsConfig {

    public static readonly prizes: Array<PrizeInterface> = [
        {
            name: Lottery.HOSPITAL,
            textName: 'szpital',
            msg: 'lottery.hospital'
        },
        {
            name: Lottery.CASSINO,
            textName: 'kasyno',
            msg: 'lottery.cassino'
        },
        {
            name: Lottery.GRANADE,
            textName: 'granat',
            msg: 'lottery.granade'
        },
        {
            name: Lottery.SHIELD,
            textName: 'tarcza',
            msg: 'lottery.shield'
        },
        {
            name: Lottery.CANARIES,
            textName: 'Kanary',
            msg: 'lottery.canaries'
        },
    ];
}
