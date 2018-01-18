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
            name: Lottery.CASINO,
            textName: 'kasyno',
            msg: 'lottery.cassino'
        },
        {
            name: Lottery.GRENADE,
            textName: 'granat',
            msg: 'lottery.granade'
        },
        {
            name: Lottery.HELMET,
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
