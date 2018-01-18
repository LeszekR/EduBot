import { Lottery } from '../../../../models/enums';


// ==================================================================================================================
export class FortuneWheelConfig {

    public static readonly prizes = [
        {
            name: Lottery.HOSPITAL,
            from: 350,
            to: 360,
            msg: 'lottery.hospital'
        },
        {
            name: Lottery.HOSPITAL,
            // name: "szpital",
            from: 0,
            to: 118,
            msg: 'lottery.hospital'
        },
        {
            name: Lottery.CASSINO,
            // name: 'kasyno',
            from: 118,
            to: 188,
            msg: 'lottery.cassino'
        },
        {
            name: Lottery.GRANADE,
            // name: 'granat',
            from: 188,
            to: 206,
            msg: 'lottery.granade'
        },
        {
            name: Lottery.SHIELD,
            // name: 'helm',
            from: 206,
            to: 277,
            msg: 'lottery.shield'
        },
        {
            name: Lottery.CANARIES,
            // name: 'kanary',
            from: 277,
            to: 350,
            msg: 'lottery.canaries'
        },
    ];
}
