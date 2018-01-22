import { Lottery } from '../../../../models/enums';
import { PrizeInterface } from './prize.interface';

export class DrawingCardsConfig {

    public static readonly prizes: Array<PrizeInterface> = [
        {
            lottery: Lottery.HOSPITAL,
            textName: 'szpital',
            msg: 'lottery.hospital'
        },
        {
            lottery: Lottery.CASINO,
            textName: 'kasyno',
            msg: 'lottery.casino'
        },
        {
            lottery: Lottery.GRENADE,
            textName: 'granat',
            msg: 'lottery.granade'
        },
        {
            lottery: Lottery.HELMET,
            textName: 'tarcza',
            msg: 'lottery.helmet'
        },
        {
            lottery: Lottery.CANARIES,
            textName: 'Kanary',
            msg: 'lottery.canaries'
        },
    ];
}
