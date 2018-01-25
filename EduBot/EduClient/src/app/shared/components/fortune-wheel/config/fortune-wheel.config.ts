import { Lottery } from '../../../../models/enums';


// ==================================================================================================================
export class LotteryItems {

    public static readonly list = [
        // mixed lotteries
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
        
        // NEW CONFIG : fortune wheel
        // ..............................................
        {
            lottery: Lottery.HELMET,
            from: 0,
            to: 18,
            msg: 'lottery.helmet'
        },

        {
            lottery: Lottery.CASINO,
            from: 18,
            to: 35,
            msg: 'lottery.casino'
        },

        {
            lottery: Lottery.CANARIES,
            from: 35,
            to: 53,
            msg: 'lottery.canaries'
        },

        {
            lottery: Lottery.HOSPITAL,
            from: 53,
            to: 70,
            msg: 'lottery.hospital'
        },

        {
            lottery: Lottery.HELMET,
            from: 70,
            to: 90,
            msg: 'lottery.helmet'
        },

        {
            lottery: Lottery.GRENADE,
            from: 90,
            to: 107,
            msg: 'lottery.grenade'
        },

        {
            lottery: Lottery.CANARIES,
            from: 107,
            to: 126,
            msg: 'lottery.canaries'
        },

        {
            lottery: Lottery.CASINO,
            from: 126,
            to: 144,
            msg: 'lottery.casino'
        },

        {
            lottery: Lottery.CANARIES,
            from: 144,
            to: 161,
            msg: 'lottery.canaries'
        },

        {
            lottery: Lottery.HELMET,
            from: 161,
            to: 180,
            msg: 'lottery.helmet'
        },

        {
            lottery: Lottery.HOSPITAL,
            from: 180,
            to: 198,
            msg: 'lottery.hospital'
        },

        {
            lottery: Lottery.CASINO,
            from: 198,
            to: 215,
            msg: 'lottery.casino'
        },

        {
            lottery: Lottery.HOSPITAL,
            from: 215,
            to: 232,
            msg: 'lottery.hospital'
        },

        {
            lottery: Lottery.CASINO,
            from: 232,
            to: 250,
            msg: 'lottery.casino'
        },

        {
            lottery: Lottery.GRENADE,
            from: 250,
            to: 269,
            msg: 'lottery.grenade'
        },

        {
            lottery: Lottery.CANARIES,
            from: 269,
            to: 286,
            msg: 'lottery.canaries'
        },

        {
            lottery: Lottery.HOSPITAL,
            from: 286,
            to: 305,
            msg: 'lottery.hospital'
        },

        {
            lottery: Lottery.CASINO,
            from: 305,
            to: 323,
            msg: 'lottery.casino'
        },

        {
            lottery: Lottery.HELMET,
            from: 323,
            to: 341,
            msg: 'lottery.helmet'
        },

        {
            lottery: Lottery.CASINO,
            from: 341,
            to: 360,
            msg: 'lottery.casino'
        },



        // old config
        // {
        //     lottery: Lottery.HOSPITAL,
        //     from: 350,
        //     to: 360,
        //     msg: 'lottery.hospital'
        // },
        // {
        //     lottery: Lottery.HOSPITAL,
        //     from: 0,
        //     to: 118,
        //     msg: 'lottery.hospital'
        // },
        // {
        //     lottery: Lottery.CASINO,
        //     from: 118,
        //     to: 188,
        //     msg: 'lottery.casino'
        // },
        // {
        //     lottery: Lottery.GRENADE,
        //     from: 188,
        //     to: 206,
        //     msg: 'lottery.grenade'
        // },
        // {
        //     lottery: Lottery.HELMET,
        //     from: 206,
        //     to: 277,
        //     msg: 'lottery.helmet'
        // },
        // {
        //     lottery: Lottery.CANARIES,
        //     from: 277,
        //     to: 350,
        //     msg: 'lottery.canaries'
        // },
    ];
}
