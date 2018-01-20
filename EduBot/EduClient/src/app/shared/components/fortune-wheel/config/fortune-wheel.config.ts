import { Lottery } from '../../../../models/enums';


// ==================================================================================================================
export class LotteryItems {

    public static readonly list = [
        {
            lottery: Lottery.HOSPITAL,
            from: 350,
            to: 360,
            msg: 'lottery.hospital'
        },
        {
            lottery: Lottery.HOSPITAL,
            from: 0,
            to: 118,
            msg: 'lottery.hospital'
        },
        {
            lottery: Lottery.CASINO,
            from: 118,
            to: 188,
            msg: 'lottery.cassino'
        },
        {
            lottery: Lottery.GRENADE,
            from: 188,
            to: 206,
            msg: 'lottery.granade'
        },
        {
            lottery: Lottery.HELMET,
            from: 206,
            to: 277,
            msg: 'lottery.shield'
        },
        {
            lottery: Lottery.CANARIES,
            from: 277,
            to: 350,
            msg: 'lottery.canaries'
        },
        {
            lottery: Lottery.DECOY,
            from: -1,
            to: -1,
            msg: 'lottery.decoy'
        },
        {
            lottery: Lottery.DEATH,
            from: -1,
            to: -1,
            msg: 'lottery.death'
        },
    ];
}
